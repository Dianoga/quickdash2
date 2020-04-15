import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';

export default function (app: Application) {
	if (typeof app.channel !== 'function') {
		// If no real-time functionality has been configured just return
		return;
	}

	app.on('connection', (connection: any) => {
		// On a new real-time connection, add it to the anonymous channel
		app.channel('anonymous').join(connection);
	});

	app.on('login', (authResult: any, { connection }: any) => {
		// connection can be undefined if there is no
		// real-time connection, e.g. when logging in via REST
		if (connection) {
			// Obtain the logged in user from the connection
			const user = connection.user;

			// The connection is no longer anonymous, remove it
			app.channel('anonymous').leave(connection);

			// Add it to the authenticated user channel
			app.channel('authenticated').join(connection);

			app.channel(`users/${user._id}`).join(connection);
		}
	});

	// eslint-disable-next-line no-unused-vars
	app.publish((data: any, hook: HookContext) => {
		if (hook.params.user?._id) {
			return app.channel(`users/${hook.params.user._id}`);
		}
	});

	// Here you can also add service specific event publishers
	// e.g. the publish the `users` service `created` event to the `admins` channel
	// app.service('users').publish('created', () => app.channel('admins'));

	// With the userid and email organization from above you can easily select involved users
	// app.service('messages').publish(() => {
	//   return [
	//     app.channel(`userIds/${data.createdBy}`),
	//     app.channel(`emails/${data.recipientEmail}`)
	//   ];
	// });
}
