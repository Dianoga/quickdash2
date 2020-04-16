import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

export interface RoomData {
	backgroundImage?: string;
	name: string;
	locationId: string;
	roomId: string;
	service: 'SMARTTHINGS';
	userId: string;
}

export class Rooms extends Service {
	constructor(options: Partial<NedbServiceOptions>, app: Application) {
		super(options);
	}
}
