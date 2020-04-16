import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { updateUserProfile, User } from '../../store/user.slice';
import UserActions from './actions';

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
		<>
			<section className="profile">
				<h2>User Profile</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="smartthings-token">SmartThings Token</label>
					<input
						type="text"
						id="smartthings-token"
						name="smartthings-token"
						value={smartthingsToken}
						onChange={(evt) => setSmartthingsToken(evt.target.value)}
					/>
					<label htmlFor="smartthings-subscribe-token">
						SmartThings Subscribe Token
					</label>
					<input
						type="text"
						id="smartthings-subscribe-token"
						name="smartthings-subscribe-token"
						value={smartthingsSubscribeToken}
						onChange={(evt) => setSmartthingsSubscribeToken(evt.target.value)}
					/>
					<button type="submit">Update profile</button>
				</form>
			</section>
			<section>
				<UserActions />
			</section>
		</>
	);
};

export default Profile;
