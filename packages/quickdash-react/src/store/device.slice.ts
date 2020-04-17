import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const refreshDevices = createAsyncThunk(
	'device/refreshDevices',
	async () => {
		const response = await client
			.service('api/quickdash')
			.create({ command: 'REFRESH_DEVICES' });
		return response;
	}
);

export const fetchDevices = createAsyncThunk(
	'device/fetchDevices',
	async () => {
		const response = await client.service('api/devices').find();
		return response;
	}
);

export type DeviceData = {
	components: any;
	deviceId: string;
	displayName: string;
	locationId: string;
	roomId?: string;
	service: 'SMARTTHINGS';
	userId: string;
};

type SliceState = {
	loading: boolean;
	devices: { [deviceId: string]: DeviceData };
};

const deviceSlice = createSlice({
	name: 'device',
	initialState: { loading: false, devices: {} } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDevices.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchDevices.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(fetchDevices.fulfilled, (state, action) => {
			state.loading = false;

			const devices = action.payload;
			const seenIds: string[] = [];

			devices.forEach((d: DeviceData) => {
				state.devices[d.deviceId] = d;
				seenIds.push(d.deviceId);
			});

			Object.keys(state.devices).forEach((key) => {
				if (!seenIds.includes(key)) delete state.devices[key];
			});
		});
	},
});

// export const {} = deviceSlice.actions;
export default deviceSlice.reducer;
