import React from 'react';

import { DeviceFilter, useDevices } from '../../utils/device.hooks';
import { Select } from '.';

export type DevicePickerValue = DeviceComponentId | DeviceComponentId[];

type Props = {
	deviceFilter: DeviceFilter;
	multiple?: boolean;
	onDevicePick: (value?: DevicePickerValue) => any;
	value?: DevicePickerValue;
};

const DevicePicker: React.FC<Props> = ({
	deviceFilter,
	multiple = true,
	onDevicePick,
	value = '',
}) => {
	const devices = useDevices(deviceFilter);

	const options: React.ReactNode[] = [];
	devices.forEach((device) => {
		device.components.forEach((component) => {
			const key = `${device.deviceId}:${component.id}`;
			let label = device.displayName;
			if (component.id !== 'main') {
				label += `: ${component.label || component.id}`;
			}

			options.push(
				<option key={key} value={key}>
					{label}
				</option>
			);
		});
	});

	const handleChange = (value?: DevicePickerValue) => {
		onDevicePick(value);
	};

	return (
		<Select
			multiple={multiple}
			onSelected={handleChange}
			placeholder="Choose device"
			value={value}
		>
			{options}
		</Select>
	);
};

export default DevicePicker;
