import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { updateUserProfile, User } from '../../store/user.slice';
import UserActions from './actions';
import PageLayout from '../utility/page.layout';
import { Input, Button, Field } from '../elements';

const Profile: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.user);

	const [smartthingsToken, setSmartthingsToken] = useState(
		user?.smartthingsToken || ''
	);

	const [smartthingsSubscribeToken, setSmartthingsSubscribeToken] = useState(
		user?.smartthingsSubscribeToken || ''
	);

	const dispatch = useDispatch();
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		const { _id } = user as User;

		dispatch(
			updateUserProfile({ _id, smartthingsToken, smartthingsSubscribeToken })
		);
	};

	if (!user) return null;

	return (
		<PageLayout>
			<h1 className="title">User Profile</h1>
			<section className="section profile">
				<h2 className="subtitle">Settings</h2>
				<div className="container">
					<form onSubmit={handleSubmit}>
						<Field label="SmartThings token">
							{' '}
							<Input
								type="text"
								value={smartthingsToken}
								onChange={(evt) => setSmartthingsToken(evt.target.value)}
							/>
						</Field>

						<Field label="SmartThings subscribe token">
							<Input
								type="text"
								value={smartthingsSubscribeToken}
								onChange={(evt) =>
									setSmartthingsSubscribeToken(evt.target.value)
								}
							/>
						</Field>
						<Button control={true} className="is-success">
							Update profile
						</Button>
					</form>
				</div>
			</section>
			<section className="section">
				<UserActions />
			</section>
		</PageLayout>
	);
};

export default Profile;
