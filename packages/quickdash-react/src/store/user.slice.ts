import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export type User = {
	_id: string;
	email: string;
	smartthingsToken?: string;
	smartthingsSubscribeToken?: string;
};

type LoginPayload = { email: string; password: string };
type UpdateProfilePayload = Pick<
	User,
	'_id' | 'smartthingsToken' | 'smartthingsSubscribeToken'
>;

export const loginUser = createAsyncThunk(
	'user/login',
	async ({ email, password }: LoginPayload) => {
		const response = await client.authenticate({
			strategy: 'local',
			email,
			password,
		});
		return response;
	}
);

export const updateUserProfile = createAsyncThunk(
	'user/updateProfile',
	async ({
		_id,
		smartthingsToken,
		smartthingsSubscribeToken,
	}: UpdateProfilePayload) => {
		const response = await client
			.service('api/users')
			.patch(_id, { smartthingsToken, smartthingsSubscribeToken });
		return response;
	}
);

// const fetchDevices = createAsyncThunk('device/fetchDevices', async () => {
// 	const resp =
// });

type Device = {};

type SliceState = {
	loading: boolean;
	user?: User;
};

const userSlice = createSlice({
	name: 'user',
	initialState: { loading: false, user: undefined } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(loginUser.fulfilled, (state, action) => {
			const { user } = action.payload;
			state.user = user;
		});
		builder.addCase(updateUserProfile.fulfilled, (state, action) => {
			console.log(action);
		});
	},
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
