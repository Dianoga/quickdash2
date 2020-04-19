import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const refreshDeviceStatuses = createAsyncThunk(
	'quickdash/refreshDevices',
	async () => {
		const response = await client
			.service('api/quickdash')
			.create({ command: 'REFRESH_DEVICE_STATUSES' });
		return response;
	}
);

export const refreshDevices = createAsyncThunk(
	'device/refreshDevices',
	async () => {
		const response = await client
			.service('api/quickdash')
			.create({ command: 'REFRESH_DEVICES' });
		return response;
	}
);

export type DeviceStatusData = {};

type SliceState = {
	loading: boolean;
	statuses: { [deviceId: string]: DeviceStatusData };
};

const quickdashSlice = createSlice({
	name: 'device',
	initialState: { loading: false, statuses: {} } as SliceState,
	reducers: {},
	extraReducers: (builder) => {},
});

export default quickdashSlice.reducer;
