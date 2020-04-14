import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const refreshDevices = createAsyncThunk(
	'device/refreshDevices',
	async () => {
		console.log('hi there');
		const response = await client
			.service('api/quickdash')
			.create({ command: 'UPDATE_DEVICES' });
		return response;
	}
);

// const fetchDevices = createAsyncThunk('device/fetchDevices', async () => {
// 	const resp =
// });

type Device = {};

type SliceState = {
	loading: boolean;
	devices: { string: Device };
};

const deviceSlice = createSlice({
	name: 'device',
	initialState: { loading: false, devices: {} } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(refreshDevices.fulfilled, (state, action) => {
			console.log('did the thing');
		});
	},
});

export const {} = deviceSlice.actions;
export default deviceSlice.reducer;
