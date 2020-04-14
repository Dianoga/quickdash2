import { Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

// A type interface for our user (it does not validate any data)
interface UserData {
	_id?: string;
	email: string;
	password: string;
	smartthingsToken?: string;
}

export class Users extends Service<UserData> {
	constructor(options: Partial<NedbServiceOptions>, app: Application) {
		super(options);
	}

	create(data: UserData, params?: Params) {
		// This is the information we want from the user signup data
		const { email, password } = data;
		// The complete user
		const userData = {
			email,
			password,
		};

		// Call the original `create` method with existing `params` and new data
		return super.create(userData, params);
	}
}
