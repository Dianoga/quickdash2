import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/user.slice';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = (event: React.SyntheticEvent) => {
		event.preventDefault();

		dispatch(loginUser({ email, password }));
	};

	return (
		<section className="login">
			<form onSubmit={handleLogin}>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(evt) => setEmail(evt.target.value)}
				/>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(evt) => setPassword(evt.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</section>
	);
};

export default Login;
