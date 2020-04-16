import { Params } from '@feathersjs/feathers';
import { SmartThingsClient, DeviceStatus } from '@smartthings/core-sdk';
import { Unprocessable } from '@feathersjs/errors';

import { Application } from '../../declarations';
import { DeviceData } from '../devices/devices.class';
import { LocationData } from '../locations/locations.class';
import { SubscriptionManager } from '../../utils/subscription.manager';

interface ServiceOptions {}

type CommandData = {
	command:
		| 'REFRESH_DEVICES'
		| 'REFRESH_DEVICE_STATUSES'
		| 'REFRESH_LOCATIONS'
		| 'REFRESH_ROOMS'
		| 'START_SMARTTHINGS_SUBSCRIPTION';
};

type CommandParams = Params & {
	smartthingsSdk?: SmartThingsClient;
};

const smartthingsCommands = [
	'REFRESH_DEVICES',
	'REFRESH_DEVICE_STATUSES',
	'REFRESH_LOCATIONS',
	'REFRESH_ROOMS',
];

export class Quickdash {
	app: Application;
	options: ServiceOptions;
	subscriptionManager: SubscriptionManager;

	constructor(options: ServiceOptions = {}, app: Application) {
		this.options = options;
		this.app = app;

		this.subscriptionManager = new SubscriptionManager(app);
	}

	async create({ command }: CommandData, params?: CommandParams): Promise<any> {
		console.log(`called with ${command}`);
		const userId = params?.user?._id as string;
		const st = params?.smartthingsSdk as SmartThingsClient;

		if (!st && smartthingsCommands.includes(command))
			throw new Unprocessable('Missing SmartThings PAT');

		if (command === 'REFRESH_DEVICES') {
			const devices = await st.devices.listAll();

			// @todo remove missing devices

			devices.forEach((d) => {
				const data: Omit<DeviceData, 'deviceId'> = {
					components: d.components,
					displayName: d.label || (d.name as string),
					locationId: d.locationId as string,
					roomId: d.roomId,
					service: 'SMARTTHINGS',
					userId,
				};

				this.app.service('api/devices').update(d.deviceId as string, data, {
					...params,
					nedb: { upsert: true },
				});
			});
		} else if (command === 'REFRESH_DEVICE_STATUSES') {
			const service = this.app.service('api/device-statuses');

			const devices = (await this.app.service('api/devices').find({
				...params,
				query: {
					$select: ['deviceId', 'service'],
				},
			})) as Pick<DeviceData, 'deviceId' | 'service'>[];

			devices.forEach(async (d) => {
				if (d.service === 'SMARTTHINGS') {
					try {
						const statuses = await st.devices.getStatus(d.deviceId);

						if (!statuses.components) return;

						Object.keys(statuses.components).forEach((componentId) => {
							const component = statuses.components?.[componentId];
							if (!component) return;

							Object.keys(component).forEach((capabilityId) => {
								Object.keys(component[capabilityId]).forEach(
									(attributeName) => {
										const attribute = component[capabilityId][attributeName];
										let { value, unit, data } = attribute;
										let valueType;

										if (
											value &&
											typeof value !== 'string' &&
											typeof value !== 'number'
										) {
											value = JSON.stringify(value);
											valueType = 'json';
										}

										service.update(
											d.deviceId,
											{
												deviceId: d.deviceId,
												componentId,
												capabilityId,
												attributeName,
												value,
												valueType: valueType === 'json' ? 'json' : undefined,
												unit,
												data,
												userId,
											},
											{ ...params, nedb: { upsert: true } }
										);
									}
								);
							});
						});
					} catch (e) {
						console.error('Problem updating device status', e);
					}
				}
			});
		} else if (command === 'REFRESH_LOCATIONS') {
			const locations = await st.locations.list();

			locations.forEach(async (l) => {
				const location = await st.locations.get(l.locationId);
				this.app
					.service('api/locations')
					.update(
						location.locationId,
						{ ...location, service: 'SMARTTHINGS', userId },
						{ ...params, nedb: { upsert: true } }
					);
			});
		} else if (command === 'REFRESH_ROOMS') {
			const locations = (await this.app.service('api/locations').find({
				...params,
				query: { $select: ['locationId', 'service'] },
			})) as Pick<LocationData, 'locationId' | 'service'>[];

			locations.forEach(async (l) => {
				if (l.service === 'SMARTTHINGS') {
					const rooms = await st.rooms.list(l.locationId);
					rooms.forEach((r) => {
						this.app
							.service('api/rooms')
							.update(
								r.roomId as string,
								{ ...r, userId },
								{ ...params, nedb: { upsert: true } }
							);
					});
				}
			});
		} else if (command === 'START_SMARTTHINGS_SUBSCRIPTION') {
			this.subscriptionManager.subscribe(userId);
		}
	}
}
