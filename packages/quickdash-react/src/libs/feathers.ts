import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

const client = feathers();

export const initFeathers = async (dispatch: Function): Promise<void> => {
	const socket = io('/');

	socket.on('connect', () => {
		console.log('connect');
	});

	socket.on('disconnect', () => {
		console.log('disconnect');
	});

	socket.on('reconnecting', () => {
		console.log('reconnecting');
	});

	socket.on('reconnect_failed', () => {
		console.log('reconnect_failed');
	});

	socket.on('error', (e: Error) => {
		console.log('socket error', e); // eslint-disable-line no-console
	});

	client.configure(socketio(socket));
	client.configure(auth());

	client
		.reAuthenticate()
		.then((resp) => {
			dispatch({ type: 'user/login/fulfilled', payload: resp });
		})
		.catch((e) => {
			console.warn('Re auth failed', e);
		});
};

export default client;
