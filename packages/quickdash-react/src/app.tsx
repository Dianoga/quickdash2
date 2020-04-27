import React, { useEffect } from 'react';

import Login from './components/user/login';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import ReactModal from 'react-modal';

import Profile from './components/user/profile';
import Setup from './components/setup';
import Dashboard from './components/dashboard/dashboard';
import { RootState } from './store';
import { fetchDevices } from './store/device.slice';
import { fetchDeviceStatuses } from './store/device-status.slice';
import { fetchDashboards } from './store/dashboard.slice';

import './app.scss';

ReactModal.defaultStyles.content = {};
ReactModal.defaultStyles.overlay = {};
ReactModal.setAppElement('body');

function App() {
	const { user, loading } = useSelector((state: RootState) => state.user);

	const dispatch = useDispatch();
	useEffect(() => {
		if (user) {
			dispatch(fetchDashboards());
			dispatch(fetchDevices());
			dispatch(fetchDeviceStatuses());
		}
	}, [user, dispatch]);

	return (
		<div className="app">
			<Routes>
				{user && (
					<>
						<Route path="/user/profile" element={<Profile />} />
						<Route path="/dashboard/:dashboardId/*" element={<Dashboard />} />
						<Route path="/" element={<Setup />} />
						<Route path="*" element={<Navigate to="/" />} />
					</>
				)}
				{!user && !loading && <Route path="*" element={<Login />} />}
			</Routes>
			{!user && loading && (
				<div className="container">
					<div className="notification is-primary">Loading</div>
				</div>
			)}
		</div>
	);
}

export default App;
