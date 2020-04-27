import React from 'react';
import classnames from 'classnames';

import {
	useDevices,
	useDeviceStatuses,
	DeviceComponentId,
} from '../../../utils/device.hooks';
import { DeviceData } from '../../../store/device.slice';
import { DeviceStatusData } from '../../../store/device-status.slice';
import Icon, { IconType } from '../../icons';

import type { BaseWidgetData } from '../widget';

import './aggregate.widget.scss';

export interface AggregateData extends BaseWidgetData {
	type: 'AGGREGATE';
	capabilityId: string;
	attributeName: string;
	deviceComponentIds?: DeviceComponentId[];
	iconType?: IconType;
	warnValues: string[];
}

const Aggregate: React.FC<AggregateData> = ({
	attributeName,
	capabilityId,
	deviceComponentIds,
	iconType,
	warnValues = [],
}) => {
	const devices = useDevices({
		deviceComponentIds,
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
			devices.some((device) => {
				if (device.deviceId === status.deviceId) {
					warnDevices.push(device);
					return true;
				}

				return false;
			});
		}
	});

	const isWarn = warnDevices.length > 0;

	const classes = classnames('aggregate', { warn: isWarn });

	let warnDevicesEl;
	if (isWarn) {
		let status = warnDevices[0].displayName;
		if (warnDevices.length > 1) {
			status += ` and ${warnDevices.length - 1} others`;
		}
		warnDevicesEl = <div className="message warn-devices">{status}</div>;
	}

	const iconClasses = classnames({ warn: isWarn });
	return (
		<div className={classes}>
			{iconType && <Icon className={iconClasses} type={iconType} />}
			{warnDevicesEl}
			{!isWarn && <div className="message awesome">Everything is awesome</div>}
		</div>
	);
};

export default Aggregate;
