// Initializes the `device-statuses` service on path `/api/device-statuses`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { DeviceStatuses } from './device-statuses.class';
import createModel from '../../models/device-statuses.model';
import hooks from './device-statuses.hooks';

// Add this service to the service type index
declare module '../../declarations' {
	interface ServiceTypes {
		'api/device-statuses': DeviceStatuses & ServiceAddons<any>;
	}
}

export default function (app: Application) {
	const options = {
		Model: createModel(app),
		id: 'deviceId',
	};

	// Initialize our service with any options it requires
	app.use('/api/device-statuses', new DeviceStatuses(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('api/device-statuses');

	service.hooks(hooks);
}
