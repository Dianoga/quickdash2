import React, { useState } from 'react';

import { DoorControlProps } from './doorcontrol.widget';
import { Field, DevicePicker, DevicePickerValue } from '../../elements';
import { WidgetSettingsChildProps } from '../widget.settings';

interface Props extends WidgetSettingsChildProps {
	widgetSettings: Partial<DoorControlProps>;
}

const DoorControlSettings: React.FC<Props> = ({
	widgetSettings: { deviceComponentId },
	onChange,
}) => {
	const handleDevicePick = (value?: DevicePickerValue) => {
		onChange({ deviceComponentId: value });
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
