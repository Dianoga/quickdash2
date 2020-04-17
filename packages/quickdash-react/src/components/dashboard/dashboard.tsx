import React, { useState } from 'react';
import { MuuriComponent } from 'muuri-react';
import TestWidget from '../widgets/test.widget';

const Dashboard: React.FC = () => {
	const [widgets, setWidgets] = useState([
		{
			key: 'test-1',
			type: 'test',
		},
		{
			key: 'test-2',
			type: 'test',
		},
	]);

	const children = widgets.map((widget) => {
		return <TestWidget {...widget} />;
	});

	return (
		<section className="dashboard">
			<MuuriComponent>{children}</MuuriComponent>
		</section>
	);
};

export default Dashboard;
