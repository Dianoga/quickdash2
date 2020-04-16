// Initializes the `rooms` service on path `/api/rooms`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Rooms } from './rooms.class';
import createModel from '../../models/rooms.model';
import hooks from './rooms.hooks';

// Add this service to the service type index
declare module '../../declarations' {
	interface ServiceTypes {
		'api/rooms': Rooms & ServiceAddons<any>;
	}
}

export default function (app: Application) {
	const options = {
		Model: createModel(app),
		id: 'roomId',
	};

	// Initialize our service with any options it requires
	app.use('/api/rooms', new Rooms(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('api/rooms');

	service.hooks(hooks);
}
