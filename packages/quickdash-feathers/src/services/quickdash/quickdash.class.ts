import { Params } from '@feathersjs/feathers';
import { SmartThingsClient } from '@smartthings/core-sdk';
import { Unprocessable } from '@feathersjs/errors';

import { Application } from '../../declarations';
import { DeviceData } from '../devices/devices.class';

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

		if (!params?.smartthingsSdk && smartthingsCommands.includes(command))
			throw new Unprocessable('Missing SmartThings PAT');

		if (command === 'REFRESH_DEVICES') {
			const client = params?.smartthingsSdk as SmartThingsClient;
			const devices = await client.devices.listAll();

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
			const client = params?.smartthingsSdk as SmartThingsClient;
			const service = this.app.service('api/device-statuses');

			const devices = (await this.app.service('api/devices').find({
				query: {
					$select: ['deviceId', 'service'],
				},
			})) as Pick<DeviceData, 'deviceId' | 'service'>[];

			devices.forEach(async (d) => {
				if (d.service === 'SMARTTHINGS') {
					const statuses = await client.devices.getStatus(d.deviceId);
					service.update(
						d.deviceId,
						{ ...statuses, userId },
						{ ...params, nedb: { upsert: true } }
					);
				}
			});
		}
	}
}
