import React, { useState } from 'react';
import { MuuriComponent } from 'muuri-react';

import './dashboard.scss';
import Widget from '../widgets/widget';

const Dashboard: React.FC = () => {
	const [widgets, setWidgets] = useState([
		{
			key: 'test-1',
			widgetInfo: {
				type: 'TEST',
			},
		},
		{
			key: 'test-2',
			widgetInfo: {
				type: 'DOOR_CONTROL',
				deviceId: '1234',
			},
		},
	]);

	const children = widgets.map((widget) => {
		return <Widget {...widget} />;
	});

	const layoutOptions = {
		dragReleaseDuration: 400,
		dragSortHeuristics: {
			sortInterval: 60,
		},
		layoutDuration: 400,
		dragReleseEasing: 'ease',
		layoutEasing: 'ease',
		dragEnabled: true,
		dragContainer: document.body,
		// The placeholder of an item that is being dragged.
		dragPlaceholder: {
			enabled: true,
			duration: 400,
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
