type WidgetType = 'DOOR_CONTROL' | 'AGGREGATE' | '';

interface BaseWidgetData {
	id: string;
	width?: number;
	height?: number;
}

interface UnknownData extends BaseWidgetData {
	type: '';
}

interface DoorControlData extends BaseWidgetData {
	type: 'DOOR_CONTROL';
	deviceComponentId: DeviceComponentId;
}

interface AggregateData extends BaseWidgetData {
	type: 'AGGREGATE';
	capabilityId: string;
	attributeName: string;
	deviceFilter?: DeviceFilter;
	iconType?: IconType;
	warnValues: string[];
}

type WidgetData = UnknownData | DoorControlData | AggregateData;
