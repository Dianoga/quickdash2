import { Params } from '@feathersjs/feathers';
import { SmartThingsClient } from '@smartthings/core-sdk';
import { Unprocessable } from '@feathersjs/errors';

import { Application } from '../../declarations';
import { DeviceData } from '../devices/devices.class';
import { LocationData } from '../locations/locations.class';

interface ServiceOptions {}

type CommandData = {
	command: 'REFRESH_DEVICES';
};

type CommandParams = Params & {
	smartthingsSdk?: SmartThingsClient;
};

const smartthingsCommands = ['REFRESH_DEVICES', 'REFRESH_DEVICE_STATUSES'];

export class Quickdash {
	app: Application;
	options: ServiceOptions;

	constructor(options: ServiceOptions = {}, app: Application) {
		this.options = options;
		this.app = app;
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
					const statuses = await st.devices.getStatus(d.deviceId);
					service.update(
						d.deviceId,
						{ ...statuses, userId },
						{ ...params, nedb: { upsert: true } }
					);
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
		}
	}
}
