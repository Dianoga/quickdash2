import React from 'react';
import { useDispatch } from 'react-redux';

import {
	refreshDevices,
	refreshDeviceStatuses,
} from '../../store/quickdash.slice';
import {
	refreshLocations,
	subscribeSmartthings,
} from '../../store/location.slice';
import { refreshRooms } from '../../store/room.slice';
import { Button } from '../elements';

const UserActions: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<>
			<h2 className="subtitle">Actions</h2>
			<ul className="user-actions">
				<li>
					<Button onClick={() => dispatch(refreshLocations())}>
						Refresh Locations
					</Button>
				</li>
				<li>
					<Button onClick={() => dispatch(refreshRooms())}>
						Refresh Rooms
					</Button>
				</li>
				<li>
					<Button onClick={() => dispatch(refreshDevices())}>
						Refresh Devices
					</Button>
				</li>
				<li>
					<Button onClick={() => dispatch(refreshDeviceStatuses())}>
						Refresh Device Statuses
					</Button>
				</li>
				<li>
					<Button onClick={() => dispatch(subscribeSmartthings())}>
						Start SmartThings Subscription
					</Button>
				</li>
			</ul>
		</>
	);
};

export default UserActions;
