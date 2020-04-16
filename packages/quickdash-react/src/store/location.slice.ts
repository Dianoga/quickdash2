import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const refreshLocations = createAsyncThunk(
	'location/refreshLocations',
	async () => {
		const response = await client
			.service('api/quickdash')
			.create({ command: 'REFRESH_LOCATIONS' });
		return response;
	}
);

export const subscribeSmartthings = createAsyncThunk(
	'location/subscribeSmartthings',
	async () => {
		const response = await client
			.service('api/quickdash')
			.create({ command: 'START_SMARTTHINGS_SUBSCRIPTION' });
		return response;
	}
);

export const fetchLocations = createAsyncThunk(
	'location/fetchLocations',
	async () => {
		const response = await client.service('api/location-statuses').find();
		return response;
	}
);

export type LocationData = {};

type SliceState = {
	loading: boolean;
	locations: { [locationId: string]: LocationData };
};

const locationSlice = createSlice({
	name: 'location',
	initialState: { loading: false, locations: {} } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		// builder.addCase(fetchLocations.pending, (state) => {
		// 	state.loading = true;
		// });
		// builder.addCase(fetchLocations.rejected, (state) => {
		// 	state.loading = false;
		// });
		// builder.addCase(fetchLocations.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	const locations = action.payload;
		// 	const seenIds: string[] = [];
		// });
	},
});

export const {} = locationSlice.actions;
export default locationSlice.reducer;
