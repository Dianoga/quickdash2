import { EventType } from '../utils/subscription';

type BaseEvent = {
	eventTime: number;
	eventType: EventType;
};

export interface DeviceEvent extends BaseEvent {
	eventType: EventType.DEVICE_EVENT;
	deviceEvent: {
		eventId: string;
		locationId: string;
		deviceId: string;
		componentId: string;
		capability: string;
		attribute: string;
		value: any;
		valueType: string;
		stateChange: boolean;
		data: string;
		subscriptionName: string;
	};
}

export type SpigotEvent = DeviceEvent;
