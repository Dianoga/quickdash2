import { combineReducers, configureStore } from '@reduxjs/toolkit';

import device from './device.slice';
import user from './user.slice';

export const rootReducer = combineReducers({ device, user });
export const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof rootReducer>;
