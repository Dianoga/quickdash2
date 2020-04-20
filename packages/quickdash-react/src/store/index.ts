import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';

import device from './device.slice';
import deviceStatus from './device-status.slice';
import location from './location.slice';
import room from './room.slice';
import user from './user.slice';

export const rootReducer = combineReducers({
	device,
	deviceStatus,
	location,
	room,
	user,
});
export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false,
	}),
});
export type RootState = ReturnType<typeof rootReducer>;
