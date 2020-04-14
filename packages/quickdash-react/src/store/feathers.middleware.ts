import io from 'socket.io-client';
import feathers, { Application } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

const client = feathers();

// const feathersMiddleware = store => next => async action => {
// 	const {dispatch} = store;
// }
