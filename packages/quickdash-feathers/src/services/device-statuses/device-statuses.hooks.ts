import * as authentication from '@feathersjs/authentication';
import { debug } from 'feathers-hooks-common';

import { limitToUser, setUserId } from '../../hooks/user-management';
import cleanStatusValue from '../../hooks/clean-status-value';
import buildStatusId from '../../hooks/build-status-id';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
	before: {
		all: [authenticate('jwt')],
		find: [limitToUser],
		get: [limitToUser],
		create: [setUserId, cleanStatusValue()],
		update: [buildStatusId(), limitToUser, cleanStatusValue()],
		patch: [buildStatusId(), limitToUser, cleanStatusValue()],
		remove: [limitToUser],
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
