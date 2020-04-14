import React from 'react';

import Login from './components/user/login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { refreshDevices } from './store/device.slice';

import './app.scss';
import Profile from './components/user/profile';

function App() {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<div className="app">
			{!user && <Login />}
			{user && (
				<>
					<section className="user-actions">
						<p>Welcome {user.email}</p>
						<ul>
							<li>
								<button onClick={() => dispatch(refreshDevices())}>
									Refresh Devices
								</button>
							</li>
						</ul>
					</section>
					<Profile />
				</>
			)}
		</div>
	);
}

export default App;
