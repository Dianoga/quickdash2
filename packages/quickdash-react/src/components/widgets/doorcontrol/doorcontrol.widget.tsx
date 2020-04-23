import React, { useState } from 'react';
import classnames from 'classnames';

import { useDeviceStatuses } from '../../../utils/device.hooks';

import './doorcontrol.widget.scss';
import { DeviceComponentId } from '../../../typings/global';
import { extractDeviceComponentId } from '../../../utils/device.utils';
import { WidgetSettingsChildProps } from '../widget.settings';

export type DoorControlProps = {
	deviceComponentId: DeviceComponentId;
};

const DoorControl: React.FC<DoorControlProps> = ({ deviceComponentId }) => {
	const [status] = useDeviceStatuses([
		{
			...extractDeviceComponentId(deviceComponentId),
			capabilityId: 'doorControl',
			attributeName: 'door',
		},
	]);

	const doorClasses = classnames({
		door: true,
		[status?.value]: true,
	});

	const handleToggle = (event: React.SyntheticEvent) => {
		event.stopPropagation();

		// if (status === 'closed') {
		// 	setStatus('opening');
		// } else if (status === 'opening') {
		// 	setStatus('open');
		// } else if (status === 'open') {
		// 	setStatus('closing');
		// } else {
		// 	setStatus('closed');
		// }
	};

	return (
		<div className="door-control" onClick={handleToggle}>
			<div className="roof" />
			<div className="walls">
				<div className="hole">
					<div className={doorClasses} />
				</div>
			</div>
		</div>
	);
};

export default DoorControl;
