import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';
import { extractCapabilities, ObjectSet } from '../utils/helpers';

export const fetchDevices = createAsyncThunk(
	'device/fetchDevices',
	async () => {
		const response = await client.service('api/devices').find();
		return response;
	}
);

export type Capability = { id: string; version: string };

export type DeviceData = {
	components: {
		id: string;
		label: string;
		capabilities: Capability[];
	}[];
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
	capabilities: Capability[];
};

const deviceSlice = createSlice({
	name: 'device',
	initialState: { loading: false, devices: {}, capabilities: [] } as SliceState,
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

			const capabilities = new ObjectSet(state.capabilities);

			devices.forEach((d: DeviceData) => {
				state.devices[d.deviceId] = d;
				seenIds.push(d.deviceId);

				extractCapabilities(d).forEach((c) => capabilities.add(c));
			});

			state.capabilities = Array.from(capabilities).sort(
				(a: Capability, b: Capability) => {
					return a.id <= b.id ? -1 : 1;
				}
			);

			Object.keys(state.devices).forEach((key) => {
				if (!seenIds.includes(key)) delete state.devices[key];
			});
		});
	},
});

// export const {} = deviceSlice.actions;
export default deviceSlice.reducer;
