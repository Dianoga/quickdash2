import React from 'react';

import Login from './components/user/login';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';

import './app.scss';
import Profile from './components/user/profile';
import UserActions from './components/user/actions';
import { RootState } from './store';
import Dashboard from './components/dashboard/dashboard';

function App() {
	const { user, loading } = useSelector((state: RootState) => state.user);

	return (
		<div className="app">
			<Routes>
				{user && (
					<>
						<Route path="/user/profile" element={<Profile />} />
						<Route path="/" element={<Dashboard />} />
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
