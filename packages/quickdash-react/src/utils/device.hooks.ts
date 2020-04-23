import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';

import { DeviceStatusData } from '../store/device-status.slice';
import { RootState } from '../store';
import { DeviceData } from '../store/device.slice';

export type DeviceFilter = {
	deviceFilter?: Partial<DeviceData>[];
	capabilityFilter?: string[];
};

const makeDevicesSelector = () =>
	createSelector(
		(state: RootState) => state.device.devices,
		(_, deviceFilter: DeviceFilter) => deviceFilter,
		(devices, { deviceFilter, capabilityFilter }) => {
			return Object.values(devices).filter((device) => {
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
		}
	);

const makeDeviceStatusesSelector = () =>
	createSelector(
		(state: RootState) => state.deviceStatus.statuses,
		(_, statusFilter: Partial<DeviceStatusData>[] = []) => statusFilter,
		(statuses, statusFilter) => {
			return Object.values(statuses).filter((status) => {
				return statusFilter.some((filter) => {
					return Object.keys(filter).every(
						(key) => status[key] === filter[key]
					);
				});
			});
		}
	);

export const useDevices = (deviceFilter: DeviceFilter) => {
	const memoSelector = useMemo(makeDevicesSelector, []);
	const devices = useSelector(
		(state: RootState) => memoSelector(state, deviceFilter),
		shallowEqual
	);

	return devices;
};

export const useDeviceStatuses = (
	statusFilter: Partial<DeviceStatusData>[] = []
): DeviceStatusData[] => {
	const memoSelector = useMemo(makeDeviceStatusesSelector, []);
	const statuses = useSelector(
		(state: RootState) => memoSelector(state, statusFilter),
		shallowEqual
	);

	return statuses;
};
