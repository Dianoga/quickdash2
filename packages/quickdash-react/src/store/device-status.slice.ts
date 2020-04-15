import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const refreshDeviceStatuses = createAsyncThunk(
	'device/refreshDevices',
	async () => {
		const response = await client
			.service('api/quickdash')
			.create({ command: 'REFRESH_DEVICE_STATUSES' });
		return response;
	}
);

export const fetchDeviceStatuses = createAsyncThunk(
	'device/fetchDeviceStatuses',
	async () => {
		const response = await client.service('api/device-statuses').find();
		return response;
	}
);

export type DeviceStatusData = {};

type SliceState = {
	loading: boolean;
	statuses: { [deviceId: string]: DeviceStatusData };
};

const deviceSlice = createSlice({
	name: 'device',
	initialState: { loading: false, statuses: {} } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		// builder.addCase(fetchDeviceStatuses.pending, (state) => {
		// 	state.loading = true;
		// });
		// builder.addCase(fetchDeviceStatuses.rejected, (state) => {
		// 	state.loading = false;
		// });
		// builder.addCase(fetchDeviceStatuses.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	const devices = action.payload;
		// 	const seenIds: string[] = [];
		// });
	},
});

export const {} = deviceSlice.actions;
export default deviceSlice.reducer;
