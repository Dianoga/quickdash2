import React, {
	Suspense,
	lazy,
	Profiler,
	ProfilerOnRenderCallback,
} from 'react';
import { useData } from 'muuri-react';
import TestWidget from './test.widget';

const DoorControl = lazy(() => import('./doorcontrol.widget'));
const Aggregate = lazy(() => import('./aggregate.widget'));

enum WidgetType {
	DOOR_CONTROL = 'DOOR_CONTROL',
	AGGREGATE = 'AGGREGATE',
	TEST = 'TEST',
}

type Props = {
	widgetInfo: {
		type: WidgetType;
	} & any;
};

const Widget: React.FC<Props> = ({ widgetInfo: { type, ...widgetParams } }) => {
	useData({ type });

	let widget = <p>Unimplemented</p>;
	if (type === WidgetType.TEST) {
		widget = <TestWidget {...widgetParams} />;
	} else if (type === WidgetType.DOOR_CONTROL) {
		widget = <DoorControl {...widgetParams} />;
	} else if (type === WidgetType.AGGREGATE) {
		widget = <Aggregate {...widgetParams} />;
	}

	return (
		<div className="widget">
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
