import React from 'react';
import classnames from 'classnames';

import { useDevices, useDeviceStatuses } from '../../../utils/device.hooks';
import { DeviceData } from '../../../store/device.slice';
import { DeviceStatusData } from '../../../store/device-status.slice';
import Icon, { IconType } from '../../icons';

import './aggregate.widget.scss';

type Props = {
	capabilityId: string;
	attributeName: string;
	deviceFilter?: Partial<DeviceData>[];
	iconType?: IconType;
	warnValues: string[];
};

const Aggregate: React.FC<Props> = ({
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
	statuses.forEach((status) => {
		if (warnValues.includes(status.value)) warnStatuses.push(status);
	});

	const classes = classnames('aggregate', { warn: warnValues.length > 0 });

	if (!iconType) {
		return (
			<div className={classes}>
				Good: {statuses.length - warnStatuses.length}
				<br />
				Warn: {warnStatuses.length}
			</div>
		);
	}

	const iconClasses = classnames({ warn: warnValues.length > 0 });
	return (
		<div className={classes}>
			<Icon className={iconClasses} type={iconType} />
		</div>
	);
};

export default Aggregate;
