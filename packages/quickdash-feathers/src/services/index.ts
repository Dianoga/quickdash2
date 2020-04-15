import { Application } from '../declarations';
import users from './users/users.service';
import devices from './devices/devices.service';
import quickdash from './quickdash/quickdash.service';
import deviceStatuses from './device-statuses/device-statuses.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
	app.configure(users);
	app.configure(devices);
	app.configure(quickdash);
	app.configure(deviceStatuses);
}
