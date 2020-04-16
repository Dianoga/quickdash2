// Initializes the `locations` service on path `/api/locations`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Locations } from './locations.class';
import createModel from '../../models/locations.model';
import hooks from './locations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
	interface ServiceTypes {
		'api/locations': Locations & ServiceAddons<any>;
	}
}

export default function (app: Application) {
	const options = {
		Model: createModel(app),
		id: 'locationId',
	};

	// Initialize our service with any options it requires
	app.use('/api/locations', new Locations(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('api/locations');

	service.hooks(hooks);
}
