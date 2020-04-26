import React, { useState } from 'react';
import classnames from 'classnames';

import {
	useDeviceStatuses,
	DeviceComponentId,
} from '../../../utils/device.hooks';
import { extractDeviceComponentId } from '../../../utils/helpers';

import type { BaseWidgetData } from '../widget';

import './doorcontrol.widget.scss';

export interface DoorControlData extends BaseWidgetData {
	type: 'DOOR_CONTROL';
	deviceComponentId: DeviceComponentId;
}

const DoorControl: React.FC<DoorControlData> = ({ deviceComponentId }) => {
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
