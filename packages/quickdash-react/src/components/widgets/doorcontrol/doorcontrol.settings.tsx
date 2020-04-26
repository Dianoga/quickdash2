import React from 'react';

import { Field, DevicePicker, DevicePickerValue } from '../../elements';
import { WidgetSettingsChildProps } from '../widget.settings';
import { DoorControlData } from './doorcontrol.widget';

type Props = WidgetSettingsChildProps & {
	widgetSettings: DoorControlData;
};

const DoorControlSettings: React.FC<Props> = ({ widgetSettings, onChange }) => {
	const { deviceComponentId } = widgetSettings;

	const handleDevicePick = (value: DevicePickerValue) => {
		const data: DoorControlData = {
			...widgetSettings,
			deviceComponentId: value as string,
		};
		onChange(data);
	};

	return (
		<Field label="Choose device">
			<DevicePicker
				deviceFilter={{ capabilityFilter: ['doorControl'] }}
				multiple={false}
				value={deviceComponentId}
				onDevicePick={handleDevicePick}
			/>
		</Field>
	);
};

export default DoorControlSettings;
