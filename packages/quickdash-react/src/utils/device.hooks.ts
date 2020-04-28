import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';

import { DeviceStatusData } from '../store/device-status.slice';
import { RootState } from '../store';
import { DeviceData } from '../store/device.slice';
import { extractDeviceComponentId } from './helpers';

export type DeviceComponentId = string;

export type DeviceFilter = {
	deviceComponentIds?: DeviceComponentId[];
	deviceFilter?: Partial<DeviceData>[];
	capabilityFilter?: string[];
};

const makeDevicesSelector = () =>
	createSelector(
		(state: RootState) => state.device.devices,
		(_: any, deviceFilter: DeviceFilter) => deviceFilter,
		(devices, { deviceComponentIds, deviceFilter, capabilityFilter }) => {
			return Object.values(devices).filter((device) => {
				let found =
					!!deviceComponentIds?.length ||
					!!deviceFilter?.length ||
					!!capabilityFilter?.length;

				if (deviceComponentIds?.length) {
					found = deviceComponentIds.some((dci) => {
						const { deviceId, componentId } = extractDeviceComponentId(dci);
						return (
							device.deviceId === deviceId &&
							device.components.some(
								(component) => component.id === componentId
							)
						);
					});
				}

				if (found && deviceFilter?.length) {
					found = deviceFilter.some((filter) => {
						return Object.keys(filter).every(
							// @ts-ignore: This is fine
							(key) => device[key] === filter[key]
						);
					});
				}

				if (found && capabilityFilter?.length) {
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
						// @ts-ignore: This is fine
						(key) => status[key] === filter[key]
					);
				});
			});
		}
	);

export const useDevices = (
	deviceFilter: DeviceFilter,
	sort: boolean = false
) => {
	// const start = Date.now();
	const memoSelector = useMemo(makeDevicesSelector, []);
	const devices = useSelector(
		(state: RootState) => memoSelector(state, deviceFilter),
		shallowEqual
	);

	if (sort) {
		devices.sort((a, b) => (a.displayName <= b.displayName ? -1 : 1));
	}

	// console.debug(`useDevices: ${Date.now() - start}ms`);

	return devices;
};

export const useDeviceStatuses = (
	statusFilter: Partial<DeviceStatusData>[] = []
): DeviceStatusData[] => {
	// const start = Date.now();

	const memoSelector = useMemo(makeDeviceStatusesSelector, []);
	const statuses = useSelector(
		(state: RootState) => memoSelector(state, statusFilter),
		shallowEqual
	);

	// console.debug(`useDeviceStatuses: ${Date.now() - start}ms`);

	return statuses;
};
