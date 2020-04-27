import React from 'react';

import {
	useDevices,
	DeviceFilter,
	DeviceComponentId,
} from '../../utils/device.hooks';
import { Select } from '.';

export type DevicePickerValue =
	| DeviceComponentId[]
	| DeviceComponentId
	| undefined;

type Props = {
	deviceFilter: DeviceFilter;
	multiple?: boolean;
	required?: boolean;
	value?: DevicePickerValue;
	onDevicePick: (selectedValue: DevicePickerValue) => any;
};

const DevicePicker: React.FC<Props> = ({
	deviceFilter,
	multiple = true,
	onDevicePick,
	required = true,
	value,
}) => {
	const devices = useDevices(deviceFilter, true);

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
			required={required}
			onSelected={handleChange}
			placeholder={multiple ? undefined : 'Choose device'}
			value={value}
		>
			{options}
		</Select>
	);
};

export default DevicePicker;
