import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

export interface DeviceData {
	deviceId: string;
	components: any;
	displayName: string;
	locationId: string;
	roomId?: string;
	service: 'SMARTTHINGS';
	userId: string;
}

export class Devices extends Service {
	constructor(options: Partial<NedbServiceOptions>, app: Application) {
		super(options);
	}
}
