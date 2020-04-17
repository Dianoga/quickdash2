import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

export interface DeviceStatusData {
	data?: any;
	deviceId: string;
	componentId: string;
	capabilityId: string;
	attributeName: string;
	value?: any;
	valueType?: 'json';
	unit?: string;
	userId: string;
}

export class DeviceStatuses extends Service<DeviceStatusData> {
	constructor(options: Partial<NedbServiceOptions>, app: Application) {
		super(options);
	}
}
