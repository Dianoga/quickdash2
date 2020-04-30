import React, { useState } from 'react';
import { MuuriComponent, GridContext } from 'muuri-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import classnames from 'classnames';

import './dashboard.scss';
import Widget from '../widgets/widget';
import PageLayout from '../utility/page.layout';
import WidgetSettings from '../widgets/widget.settings';
import { Button } from '../elements';

import type { RootState } from '../../store';
import type { DecoratedItem } from 'muuri-react/dist/types/interfaces';
import { patchDashboard } from '../../store/dashboard.slice';

const dragPlaceholder = {
	enabled: true,
	createElement: function (item: any) {
		return item.getElement().cloneNode(true);
	},
};

const Dashboard: React.FC = () => {
	const { dashboardId } = useParams();

	const [rearrange, setRearrange] = useState(false);

	const dashboard = useSelector(
		(state: RootState) => state.dashboard.dashboards[dashboardId]
	);

	const children = dashboard?.widgets?.map((widget) => {
		return <Widget key={widget.id} {...widget} />;
	});

	const dispatch = useDispatch();
	const onDragEnd = (item: DecoratedItem) => {
		const grid = item.getGrid();
		const layout = grid.getItems().map((item) => {
			return item.getKey() as string;
		});

		dispatch(
			patchDashboard({ id: dashboard._id, data: { widgetOrder: layout } })
		);
	};

	const muuriOptions = {
		dragEnabled: rearrange,
		dragContainer: document.body,
		dragPlaceholder,
		onDragEnd,
		sort: dashboard?.widgetOrder,
	};

	// console.log('dashboard rendered - child count', dashboard?.widgets?.length);

	const editDropdownClasses = classnames(
		['dropdown', 'is-hoverable', 'is-up', 'is-right'],
		{ 'is-active': rearrange }
	);

	return (
		<PageLayout>
			<section className="dashboard">
				<MuuriComponent {...muuriOptions}>{children}</MuuriComponent>

				<div className="edit">
					<div className={editDropdownClasses}>
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
								<Button
									className="dropdown-item"
									onClick={() => setRearrange(!rearrange)}
								>
									{rearrange ? 'Done arranging' : 'Rearrange dashboard'}
								</Button>
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
