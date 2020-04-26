import React from 'react';
import classnames from 'classnames';

import { useDevices, useDeviceStatuses } from '../../../utils/device.hooks';
import { DeviceData } from '../../../store/device.slice';
import { DeviceStatusData } from '../../../store/device-status.slice';
import Icon, { IconType } from '../../icons';

import './aggregate.widget.scss';

const Aggregate: React.FC<AggregateData> = ({
	attributeName,
	capabilityId,
	deviceFilter = [],
	iconType,
	warnValues = [],
}) => {
	const devices = useDevices({
		deviceFilter,
		capabilityFilter: [capabilityId],
	});

	const deviceStatusFilter: Partial<DeviceStatusData>[] = devices.map(
		(device) => {
			return {
				deviceId: device.deviceId,
				capabilityId,
				attributeName,
			};
		}
	);
	const statuses = useDeviceStatuses(deviceStatusFilter);

	let warnStatuses: DeviceStatusData[] = [];
	let warnDevices: DeviceData[] = [];
	statuses.forEach((status) => {
		if (warnValues.includes(status.value)) {
			warnStatuses.push(status);
			devices.find((device) => {
				if (device.deviceId === status.deviceId) {
					warnDevices.push(device);
					return true;
				}
			});
		}
	});

	const classes = classnames('aggregate', { warn: warnValues.length > 0 });

	let warnDevicesEl;
	if (warnDevices.length > 0) {
		let status = warnDevices[0].displayName;
		if (warnDevices.length > 1) {
			status += ` and ${warnDevices.length - 1} others`;
		}
		warnDevicesEl = <div className="warn-devices">{status}</div>;
	}

	const iconClasses = classnames({ warn: warnValues.length > 0 });
	return (
		<div className={classes}>
			{iconType && <Icon className={iconClasses} type={iconType} />}
			{warnDevicesEl}
		</div>
	);
};

export default Aggregate;
