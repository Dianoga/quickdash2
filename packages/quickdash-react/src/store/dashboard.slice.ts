import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../libs/feathers';

import type { WidgetData } from '../components/widgets/widget';

export type DashboardData = {
	widgets?: WidgetData[];
	widgetOrder?: string[];
	name: string;
	userId: string;
	_id: string;
};

export const fetchDashboards = createAsyncThunk(
	'dashboard/fetchDashboards',
	async () => {
		const response = await client.service('api/dashboards').find();
		return response;
	}
);

export const createDashboard = createAsyncThunk(
	'dashboard/createDashboard',
	async (data: Pick<DashboardData, 'name'>) => {
		const response = await client.service('api/dashboards').create(data);
		return response;
	}
);

type PatchDashboardArgs = { id: string; data: Partial<DashboardData> };

export const patchDashboard = createAsyncThunk(
	'dashboard/patchDashboard',
	async ({ id, data }: PatchDashboardArgs) => {
		const response = await client.service('api/dashboards').patch(id, data);
		return response;
	}
);

type SliceState = {
	loading: boolean;
	dashboards: { [_id: string]: DashboardData };
};

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState: { loading: false, dashboards: {} } as SliceState,
	reducers: {
		patched: (state, action) => {
			const { _id } = action.payload;
			if (_id) state.dashboards[_id] = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDashboards.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchDashboards.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(fetchDashboards.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboards = {};
			action.payload?.forEach((dashboard: DashboardData) => {
				state.dashboards[dashboard._id] = dashboard;
			});
		});
	},
});

export const { patched } = dashboardSlice.actions;
export default dashboardSlice.reducer;
