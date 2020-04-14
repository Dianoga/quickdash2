import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

type LoginPayload = { email: string; password: string };
type UpdateProfilePayload = { id: string; smartthingsToken?: string };

export type User = { _id: string; email: string; smartthingsToken?: string };

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
	async ({ id, smartthingsToken }: UpdateProfilePayload) => {
		const response = await client
			.service('api/users')
			.patch(id, { smartthingsToken });
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
		builder.addCase(loginUser.fulfilled, (state, action) => {
			const { user } = action.payload;
			state.user = user;
		});
		builder.addCase(updateUserProfile.fulfilled, (state, action) => {
			console.log(action);
		});
	},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
