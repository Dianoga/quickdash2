import NeDB from 'nedb';
import path from 'path';
import { Application } from '../declarations';

export default function (app: Application) {
	const dbPath = app.get('nedb');
	const Model = new NeDB({
		filename: path.join(dbPath, 'device-statuses.db'),
		autoload: true,
	});

	Model.persistence.setAutocompactionInterval(1 * 60 * 1000);

	Model.ensureIndex({ fieldName: 'deviceId' });
	Model.ensureIndex({ fieldName: 'userId' });

	return Model;
}
