import React from 'react';
import { MuuriComponent } from 'muuri-react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import './dashboard.scss';
import Widget from '../widgets/widget';
import PageLayout from '../utility/page.layout';
import { RootState } from '../../store';
import WidgetSettings from '../widgets/widget.settings';

const dragPlaceholder = {
	enabled: true,
	createElement: function (item: any) {
		return item.getElement().cloneNode(true);
	},
};

const Dashboard: React.FC = () => {
	const { dashboardId } = useParams();

	const dashboard = useSelector(
		(state: RootState) => state.dashboard.dashboards[dashboardId]
	);

	const children = dashboard?.widgets?.map((widget) => {
		return <Widget key={widget.id} {...widget} />;
	});

	const layoutOptions = {
		dragEnabled: false,
		dragContainer: document.body,
		// The placeholder of an item that is being dragged.
		dragPlaceholder,
	};

	// console.log('dashboard rendered - child count', dashboard?.widgets?.length);

	return (
		<PageLayout>
			<section className="dashboard">
				<MuuriComponent {...layoutOptions}>{children}</MuuriComponent>

				<div className="edit">
					<div className="dropdown is-hoverable is-up is-right">
						<div className="dropdown-trigger">
							<button
								className="button"
								aria-haspopup="true"
								aria-controls="dropdown-menu"
							>
								<span>Edit</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<Link className="dropdown-item" to="widget/new">
									Add widget
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Routes>
				<Route path="widget/:widgetId/settings" element={<WidgetSettings />} />
				<Route path="widget/new" element={<WidgetSettings isNew={true} />} />
			</Routes>
		</PageLayout>
	);
};

export default Dashboard;
