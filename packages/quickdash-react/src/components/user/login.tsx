import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/user.slice';
import { Input, Button, Field } from '../elements';
import PageLayout from '../utility/page.layout';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = (event: React.SyntheticEvent) => {
		event.preventDefault();

		dispatch(loginUser({ email, password }));
	};

	return (
		<PageLayout>
			<section className="login section">
				<form onSubmit={handleLogin}>
					<Field label="Email">
						<Input
							type="email"
							value={email}
							onChange={(evt) => setEmail(evt.target.value)}
						/>
					</Field>
					<Field label="Password">
						<Input
							type="password"
							value={password}
							onChange={(evt) => setPassword(evt.target.value)}
						/>
					</Field>
					<Button control={true} className="is-success">
						Login
					</Button>
				</form>
			</section>
		</PageLayout>
	);
};

export default Login;
