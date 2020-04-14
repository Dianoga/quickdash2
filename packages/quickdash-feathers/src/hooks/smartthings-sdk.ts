// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

import {
	SmartThingsClient,
	BearerTokenAuthenticator,
} from '@smartthings/core-sdk';

export default (options = {}): Hook => {
	return async (context: HookContext) => {
		const { smartthingsToken } = context.params.user;

		if (smartthingsToken) {
			const client = new SmartThingsClient(
				new BearerTokenAuthenticator(smartthingsToken)
			);
			context.params.smartthingsSdk = client;
		}

		return context;
	};
};
