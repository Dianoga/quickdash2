import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

type LoginPayload = { email: string; password: string };

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

// const fetchDevices = createAsyncThunk('device/fetchDevices', async () => {
// 	const resp =
// });

type Device = {};

type SliceState = {
	loading: boolean;
	user: any;
};

const userSlice = createSlice({
	name: 'user',
	initialState: { loading: false, user: null } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			const { user } = action.payload;
			state.user = user;
			console.log('did the thing');
		});
	},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
