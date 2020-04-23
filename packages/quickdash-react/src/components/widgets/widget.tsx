import React, {
	Suspense,
	lazy,
	Profiler,
	ProfilerOnRenderCallback,
} from 'react';
import { useData } from 'muuri-react';
import classnames from 'classnames';

import TestWidget from './test.widget';
import { WidgetData, WidgetType } from '../../store/dashboard.slice';

const DoorControl = lazy(() => import('./doorcontrol'));
const Aggregate = lazy(() => import('./aggregate'));

type Props = {
	widgetInfo: WidgetData;
};

const Widget: React.FC<Props> = ({
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
			</div>
		</div>
	);
};

export default Widget;
