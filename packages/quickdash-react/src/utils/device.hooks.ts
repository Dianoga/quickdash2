import { useSelector } from 'react-redux';

import { DeviceStatusData } from '../store/device-status.slice';
import { RootState } from '../store';

export const useDeviceStatus = (
	statusFilter: Partial<DeviceStatusData>
): DeviceStatusData[] => {
	const keys = Object.keys(statusFilter);

	return useSelector((state: RootState) => {
		return state.deviceStatus.statuses.filter((status) => {
			return keys.every((key) => status[key] === statusFilter[key]);
		});
	});
};
