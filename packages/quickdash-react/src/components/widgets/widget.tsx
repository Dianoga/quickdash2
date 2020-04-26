import React, { Suspense, lazy } from 'react';
import { useData } from 'muuri-react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import type { DoorControlData } from './doorcontrol/doorcontrol.widget';
import type { AggregateData } from './aggregate/aggregate.widget';

const DoorControl = lazy(() => import('./doorcontrol'));
const Aggregate = lazy(() => import('./aggregate'));

export type WidgetType = 'DOOR_CONTROL' | 'AGGREGATE' | '';

export interface BaseWidgetData {
	id: string;
	width?: number;
	height?: number;
}

export interface UnknownData extends BaseWidgetData {
	type: '';
}

export type WidgetData = UnknownData | DoorControlData | AggregateData;

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
