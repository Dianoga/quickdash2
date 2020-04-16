import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchDevices, refreshDevices } from '../../store/device.slice';
import { refreshDeviceStatuses } from '../../store/device-status.slice';
import { refreshLocations } from '../../store/location.slice';
import { refreshRooms } from '../../store/room.slice';

const UserActions: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<ul className="user-actions">
			<li>
				<button onClick={() => dispatch(refreshLocations())}>
					Refresh Locations
				</button>
			</li>
			<li>
				<button onClick={() => dispatch(refreshRooms())}>Refresh Rooms</button>
			</li>
			<li>
				<button onClick={() => dispatch(refreshDevices())}>
					Refresh Devices
				</button>
			</li>
			<li>
				<button onClick={() => dispatch(refreshDeviceStatuses())}>
					Refresh Device Statuses
				</button>
			</li>
		</ul>
	);
};

export default UserActions;
