import React from 'react';
import { useData } from 'muuri-react';
import TestWidget from './test.widget';
import DoorControl, { DoorControlProps } from './doorcontrol.widget';

enum WidgetType {
	DOOR_CONTROL = 'DOOR_CONTROL',
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
	}

	return (
		<div className="widget">
			<div className="widget-content">{widget}</div>
		</div>
	);
};

export default Widget;
