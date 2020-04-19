import { useSelector } from 'react-redux';

import { DeviceStatusData } from '../store/device-status.slice';
import { RootState } from '../store';
import { DeviceData } from '../store/device.slice';

export const useDevices = ({
	deviceFilter,
	capabilityFilter,
}: {
	deviceFilter?: Partial<DeviceData>[];
	capabilityFilter?: string[];
}) => {
	return useSelector((state: RootState) => {
		return Object.values(state.device.devices).filter((device) => {
			let found = true;
			if (deviceFilter && deviceFilter.length > 0) {
				found = deviceFilter.some((filter) => {
					return Object.keys(filter).every(
						(key) => device[key] === filter[key]
					);
				});
			}

			if (found && capabilityFilter && capabilityFilter.length > 0) {
				found = device.components.some((component) => {
					return component.capabilities.some((capability) =>
						capabilityFilter.includes(capability.id)
					);
				});
			}

			return found;
		});
	});
};

export const useDeviceStatuses = (
	statusFilter: Partial<DeviceStatusData>[] = []
): DeviceStatusData[] => {
	return useSelector((state: RootState) => {
		return state.deviceStatus.statuses.filter((status) => {
			return statusFilter.some((filter) => {
				return Object.keys(filter).every((key) => status[key] === filter[key]);
			});
		});
	});
};
