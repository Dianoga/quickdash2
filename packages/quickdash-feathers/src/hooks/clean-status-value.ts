// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
	return async (context: HookContext) => {
		let { value } = context.data;

		if (value) {
			if (value && typeof value !== 'string' && typeof value !== 'number') {
				context.data.value = JSON.stringify(value);
				context.data.valueType = 'json';
			}
		}

		return context;
	};
};
