import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const fetchDeviceStatuses = createAsyncThunk(
	'device/fetchDeviceStatuses',
	async () => {
		const response = await client.service('api/device-statuses').find();
		return response;
	}
);

export type DeviceStatusData = {
	deviceId: string;
	componentId: string;
	capabilityId: string;
	attributeName: string;
	value: any;
	unit?: string;
	userId: string;
	_id: string;
};

type SliceState = {
	loading: boolean;
	statuses: DeviceStatusData[];
};

const deviceSlice = createSlice({
	name: 'device',
	initialState: { loading: false, statuses: [] } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDeviceStatuses.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchDeviceStatuses.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(fetchDeviceStatuses.fulfilled, (state, action) => {
			state.loading = false;
			state.statuses = action.payload;
		});
	},
});

// export const {} = deviceSlice.actions;
export default deviceSlice.reducer;
