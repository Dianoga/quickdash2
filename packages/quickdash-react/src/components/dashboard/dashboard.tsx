import React, { useState } from 'react';
import { MuuriComponent } from 'muuri-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './dashboard.scss';
import Widget from '../widgets/widget';
import PageLayout from '../utility/page.layout';
import { RootState } from '../../store';

const Dashboard: React.FC = () => {
	const { dashboardId } = useParams();

	const dashboard = useSelector(
		(state: RootState) => state.dashboard.dashboards[dashboardId]
	);

	const children = dashboard?.widgets?.map((widget) => {
		return <Widget {...widget} />;
	});

	const layoutOptions = {
		layout: { fillGaps: true },
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

	let contentEl;
	if (!dashboard?.widgets) {
		contentEl = <div className="empty">Nothing to see here</div>;
	} else {
		contentEl = <MuuriComponent {...layoutOptions}>{children}</MuuriComponent>;
	}

	return (
		<PageLayout>
			<section className="dashboard">{contentEl}</section>
		</PageLayout>
	);
};

export default Dashboard;
