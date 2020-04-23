// Initializes the `dashboards` service on path `/api/dashboards`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Dashboards } from './dashboards.class';
import createModel from '../../models/dashboards.model';
import hooks from './dashboards.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/dashboards': Dashboards & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/dashboards', new Dashboards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/dashboards');

  service.hooks(hooks);
}
