import React, { useState } from 'react';
import classnames from 'classnames';

import './doorcontrol.widget.scss';

export type DoorControlProps = {
	deviceId: string;
};

const DoorControl: React.FC<DoorControlProps> = ({ deviceId }) => {
	const [status, setStatus] = useState('closed');

	const device: any = {};

	const widgetClasses = classnames({
		'door-control': true,
		warn: device.door !== 'closed',
		busy: device.busy,
	});

	const doorClasses = classnames({
		door: true,
		[status]: true,
	});

	const handleToggle = (event: React.SyntheticEvent) => {
		event.stopPropagation();

		if (status === 'closed') {
			setStatus('opening');
		} else if (status === 'opening') {
			setStatus('open');
		} else if (status === 'open') {
			setStatus('closing');
		} else {
			setStatus('closed');
		}
	};

	return (
		<div className={widgetClasses} onClick={handleToggle}>
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
