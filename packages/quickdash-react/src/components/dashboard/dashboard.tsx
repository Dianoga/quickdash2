import React, { useState } from 'react';
import { MuuriComponent } from 'muuri-react';

import './dashboard.scss';
import Widget from '../widgets/widget';

const Dashboard: React.FC = () => {
	const [widgets, setWidgets] = useState([
		{
			key: 'aggregate-1',
			widgetInfo: {
				type: 'AGGREGATE',
				capabilityId: 'switch',
				attributeName: 'switch',
			},
		},
		{
			key: 'aggregate-2',
			widgetInfo: {
				type: 'AGGREGATE',
				capabilityId: 'contactSensor',
				attributeName: 'contact',
			},
		},
		{
			key: 'aggregate-3',
			widgetInfo: {
				type: 'AGGREGATE',
				capabilityId: 'motionSensor',
				attributeName: 'motion',
			},
		},
		{
			key: 'door_control_1',
			widgetInfo: {
				type: 'DOOR_CONTROL',
				deviceId: '2dab3f37-af18-455d-abd0-912470af4b4a',
			},
		},
	]);

	const children = widgets.map((widget) => {
		return <Widget {...widget} />;
	});

	const layoutOptions = {
		dragEnabled: false,
		dragContainer: document.body,
		// The placeholder of an item that is being dragged.
		dragPlaceholder: {
			enabled: true,
			createElement: function (item: any) {
				return item.getElement().cloneNode(true);
			},
		},
	};

	return (
		<section className="dashboard">
			<MuuriComponent {...layoutOptions}>{children}</MuuriComponent>
		</section>
	);
};

export default Dashboard;
