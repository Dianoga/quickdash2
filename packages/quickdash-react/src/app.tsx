import React from 'react';

import Login from './components/user/login';
import { useSelector } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';

import './app.scss';
import Profile from './components/user/profile';
import UserActions from './components/user/actions';
import { RootState } from './store';

function App() {
	const { user } = useSelector((state: RootState) => state.user);

	return (
		<div className="app">
			<Routes>
				{user && (
					<>
						<Route path="/user/profile" element={<Profile />} />
						<Route
							path="*"
							element={<Link to="/user/profile">User Profile</Link>}
						/>
					</>
				)}
				{!user && <Route path="*" element={<Login />} />}
			</Routes>
		</div>
	);
}

export default App;
