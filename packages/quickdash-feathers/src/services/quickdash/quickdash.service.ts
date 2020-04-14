// Initializes the `quickdash` service on path `/api/quickdash`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Quickdash } from './quickdash.class';
import hooks from './quickdash.hooks';

// Add this service to the service type index
declare module '../../declarations' {
	interface ServiceTypes {
		'api/quickdash': Quickdash & ServiceAddons<any>;
	}
}

export default function (app: Application) {
	const options = {
		paginate: app.get('paginate'),
	};

	// Initialize our service with any options it requires
	app.use('/api/quickdash', new Quickdash(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('api/quickdash');

	service.hooks(hooks);
}
