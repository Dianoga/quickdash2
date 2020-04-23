import React, {
	Suspense,
	lazy,
	Profiler,
	ProfilerOnRenderCallback,
} from 'react';
import { useData } from 'muuri-react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import TestWidget from './test.widget';
import { WidgetData, WidgetType } from '../../store/dashboard.slice';

const DoorControl = lazy(() => import('./doorcontrol'));
const Aggregate = lazy(() => import('./aggregate'));

type Props = {
	id: string;
	widgetInfo: WidgetData;
};

const Widget: React.FC<Props> = ({
	id,
	widgetInfo: { type, width = 1, height = 1, ...widgetParams },
}) => {
	useData({ type });

	let widget = <p>Unimplemented</p>;
	if (type === WidgetType.DOOR_CONTROL) {
		widget = <DoorControl {...widgetParams} />;
	} else if (type === WidgetType.AGGREGATE) {
		widget = <Aggregate {...widgetParams} />;
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
					{/* <Profiler
						id={JSON.stringify({ type, ...widgetParams })}
						onRender={console.log}
					> */}
					{widget}
					{/* </Profiler> */}
				</Suspense>
				<Link className="settings" to={`widget/${id}/settings`}>
					...
				</Link>
			</div>
		</div>
	);
};

export default Widget;
