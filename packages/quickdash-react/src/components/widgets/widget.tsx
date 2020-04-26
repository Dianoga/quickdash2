import React, { Suspense, lazy } from 'react';
import { useData } from 'muuri-react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const DoorControl = lazy(() => import('./doorcontrol'));
const Aggregate = lazy(() => import('./aggregate'));

type Props = WidgetData;

const Widget: React.FC<Props> = (widgetData) => {
	const { id, type, width = 1, height = 1 } = widgetData;
	useData({ type });

	let widget = <p>Unimplemented</p>;
	if (type === 'DOOR_CONTROL') {
		widget = <DoorControl {...(widgetData as DoorControlData)} />;
	} else if (type === 'AGGREGATE') {
		widget = <Aggregate {...(widgetData as AggregateData)} />;
	}

	const widgetClasses = classnames([
		'widget',
		`width-${width}`,
		`height-${height}`,
	]);

	return (
		<div className={widgetClasses}>
			<div className="widget-content">
				<Suspense fallback={<div className="widget">Loading</div>}>
					{widget}
				</Suspense>
				<Link className="settings" to={`widget/${id}/settings`}>
					...
				</Link>
			</div>
		</div>
	);
};

export default Widget;
