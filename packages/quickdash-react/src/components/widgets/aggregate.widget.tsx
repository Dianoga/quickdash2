import React from 'react';

import { useDevices, useDeviceStatuses } from '../../utils/device.hooks';
import { DeviceData } from '../../store/device.slice';
import { DeviceStatusData } from '../../store/device-status.slice';

type Props = {
	capabilityId: string;
	attributeName: string;
	deviceFilter?: Partial<DeviceData>[];
};

const Aggregate: React.FC<Props> = ({
	attributeName,
	capabilityId,
	deviceFilter = [],
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

	let valueCounts: { [status: string]: any } = {};
	statuses.forEach(({ value }) => {
		if (!valueCounts[value]) valueCounts[value] = 0;
		valueCounts[value]++;
	});

	console.log(valueCounts);

	return <pre className="">{JSON.stringify(valueCounts, null, 2)}</pre>;
};

export default Aggregate;
