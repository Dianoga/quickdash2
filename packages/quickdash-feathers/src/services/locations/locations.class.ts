import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

export interface LocationData {
	backgroundImage?: string;
	name: string;
	latitude: number;
	locationId: string;
	longitude: number;
	regionRadius: number;
	roomId: string;
	service: 'SMARTTHINGS';
	temperatureScale: 'F' | 'C';
	userId: string;
}

export class Locations extends Service {
	constructor(options: Partial<NedbServiceOptions>, app: Application) {
		super(options);
	}
}
