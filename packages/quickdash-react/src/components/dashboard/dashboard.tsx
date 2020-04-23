import React, { useState } from 'react';
import { MuuriComponent } from 'muuri-react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import './dashboard.scss';
import Widget from '../widgets/widget';
import PageLayout from '../utility/page.layout';
import { RootState } from '../../store';
import WidgetSettings from '../widgets/widget.settings';

const Dashboard: React.FC = () => {
	const { dashboardId } = useParams();

	const dashboard = useSelector(
		(state: RootState) => state.dashboard.dashboards[dashboardId]
	);

	const children = dashboard?.widgets?.map((widget) => {
		return <Widget key={widget.id} {...widget} />;
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
		contentEl = (
			<div className="empty">
				<Link to="widget/new">Add widget</Link>
			</div>
		);
	} else {
		contentEl = <MuuriComponent {...layoutOptions}>{children}</MuuriComponent>;
	}

	return (
		<PageLayout>
			<section className="dashboard">{contentEl}</section>
			<Routes>
				<Route path="widget/:widgetId/settings" element={<WidgetSettings />} />
				<Route path="widget/new" element={<WidgetSettings isNew={true} />} />
			</Routes>
		</PageLayout>
	);
};

export default Dashboard;
