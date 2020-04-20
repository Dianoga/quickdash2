import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const fetchDeviceStatuses = createAsyncThunk(
	'device-status/fetchDeviceStatuses',
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
	statuses: { [_id: string]: DeviceStatusData };
};

const deviceStatusSlice = createSlice({
	name: 'device-status',
	initialState: { loading: false, statuses: {} } as SliceState,
	reducers: {
		patched: (state, action) => {
			const { _id } = action.payload;
			if (_id) state.statuses[_id] = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDeviceStatuses.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchDeviceStatuses.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(fetchDeviceStatuses.fulfilled, (state, action) => {
			state.loading = false;
			state.statuses = {};
			action.payload.forEach((status: DeviceStatusData) => {
				state.statuses[status._id] = status;
			});
		});
	},
});

export const { patched } = deviceStatusSlice.actions;
export default deviceStatusSlice.reducer;
