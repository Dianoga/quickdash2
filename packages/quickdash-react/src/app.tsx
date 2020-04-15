import React from 'react';

import Login from './components/user/login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';

import './app.scss';
import Profile from './components/user/profile';
import UserActions from './components/user/actions';

function App() {
	const { user } = useSelector((state: RootState) => state.user);

	return (
		<div className="app">
			{!user && <Login />}
			{user && (
				<>
					<section className="user-actions">
						<p>Welcome {user.email}</p>
						<UserActions />
					</section>
					<Profile />
				</>
			)}
		</div>
	);
}

export default App;
