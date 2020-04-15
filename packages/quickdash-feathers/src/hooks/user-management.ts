import { setField } from 'feathers-authentication-hooks';

export const setUserId = setField({
	from: 'params.user.id',
	as: 'data.userId',
});

export const limitToUser = setField({
	from: 'params.user._id',
	as: 'params.query.userId',
});
