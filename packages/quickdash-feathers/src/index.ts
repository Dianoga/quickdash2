import https from 'https';
import fs from 'fs';

import logger from './logger';
import app from './app';

const port = app.get('port');

let server;
server = app.listen(port);
process.on('unhandledRejection', (reason, p) =>
	logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
	logger.info(
		'Feathers application started on https://%s:%d',
		app.get('host'),
		port
	)
);
