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

const smartthingsCommands = ['REFRESH_DEVICES'];

export class Quickdash {
	app: Application;
	options: ServiceOptions;

	constructor(options: ServiceOptions = {}, app: Application) {
		this.options = options;
		this.app = app;
	}

	async create({ command }: CommandData, params?: CommandParams): Promise<any> {
		console.log(`called with ${command}`);

		if (!params?.smartthingsSdk && smartthingsCommands.includes(command))
			throw new Unprocessable('Missing SmartThings PAT');

		if (command === 'REFRESH_DEVICES') {
			const client = params?.smartthingsSdk as SmartThingsClient;
			const devices = await client.devices.listAll();

			devices.forEach((d) => {
				const data: DeviceData = {
					components: d.components,
					displayName: d.label || (d.name as string),
					locationId: d.locationId as string,
					roomId: d.roomId,
					service: 'SMARTTHINGS',
					userId: params?.user?._id,
				};

				this.app
					.service('api/devices')
					.update(d.deviceId as string, data, { nedb: { upsert: true } });
			});
		}
	}
}
