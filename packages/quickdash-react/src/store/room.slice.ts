import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

export const refreshRooms = createAsyncThunk('room/refreshRooms', async () => {
	const response = await client
		.service('api/quickdash')
		.create({ command: 'REFRESH_ROOMS' });
	return response;
});

export const fetchRooms = createAsyncThunk('room/fetchRooms', async () => {
	const response = await client.service('api/rooms').find();
	return response;
});

export type RoomData = {};

type SliceState = {
	loading: boolean;
	rooms: { [roomId: string]: RoomData };
};

const roomSlice = createSlice({
	name: 'room',
	initialState: { loading: false, rooms: {} } as SliceState,
	reducers: {},
	extraReducers: (builder) => {
		// builder.addCase(fetchRooms.pending, (state) => {
		// 	state.loading = true;
		// });
		// builder.addCase(fetchRooms.rejected, (state) => {
		// 	state.loading = false;
		// });
		// builder.addCase(fetchRooms.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	const rooms = action.payload;
		// 	const seenIds: string[] = [];
		// });
	},
});

// export const {} = roomSlice.actions;
export default roomSlice.reducer;
