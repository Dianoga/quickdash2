import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchDevices, refreshDevices } from '../../store/device.slice';
import { refreshDeviceStatuses } from '../../store/device-status.slice';

const UserActions: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<ul className="user-actions">
			<li>
				<button onClick={() => dispatch(refreshDevices())}>
					Refresh Devices
				</button>
			</li>
			<li>
				<button onClick={() => dispatch(fetchDevices())}>Fetch Devices</button>
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
