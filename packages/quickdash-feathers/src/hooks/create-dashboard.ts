// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
	return async (context: HookContext) => {
		await context.app
			.service('api/dashboards')
			.create({ name: 'Home' }, context.params);

		return context;
	};
};
