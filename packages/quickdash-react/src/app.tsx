import React from 'react';

import Login from './components/login';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import './app.scss';

function App() {
	const { user } = useSelector((state: RootState) => state.user);

	return (
		<div className="app">
			{!user && <Login />}
			{user && <p>Welcome {user.email}</p>}
		</div>
	);
}

export default App;
