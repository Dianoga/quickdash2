import { Application } from '../declarations';

const EventSource = require('eventsource');

export enum EventType {
	CONTROL_EVENT = 'CONTROL_EVENT',
	WELCOME_EVENT = 'WELCOME_EVENT',
	DEVICE_EVENT = 'DEVICE_EVENT',
	DEVICE_LIFECYCLE_EVENT = 'DEVICE_LIFECYCLE_EVENT',
	DEVICE_HEALTH_EVENT = 'DEVICE_HEALTH_EVENT',
	DEVICE_COMMANDS_EVENT = 'DEVICE_COMMANDS_EVENT',
	DEVICE_JOIN_EVENT = 'DEVICE_JOIN_EVENT',
	LOCATION_LIFECYCLE_EVENT = 'LOCATION_LIFECYCLE_EVENT',
	MODE_EVENT = 'MODE_EVENT',
	TIMER_EVENT = 'TIMER_EVENT',
	SCENE_LIFECYCLE_EVENT = 'SCENE_LIFECYCLE_EVENT',
	SECURITY_ARM_STATE_EVENT = 'SECURITY_ARM_STATE_EVENT',
	SECURITY_ARM_FAILURE_EVENT = 'SECURITY_ARM_FAILURE_EVENT',
	PAID_SUBSCRIPTIONS_EVENT = 'PAID_SUBSCRIPTIONS_EVENT',
	INSTALLED_APP_LIFECYCLE_EVENT = 'INSTALLED_APP_LIFECYCLE_EVENT',
	SMART_APP_EVENT = 'SMART_APP_EVENT',
	SMART_APP_DASHBOARD_CARD_EVENT = 'SMART_APP_DASHBOARD_CARD_EVENT',
	EXECUTION_RESULT_EVENT = 'EXECUTION_RESULT_EVENT',
	HUB_LIFECYCLE_EVENT = 'HUB_LIFECYCLE_EVENT',
	HUB_HEALTH_EVENT = 'HUB_HEALTH_EVENT',
	HUB_ZWAVE_STATUS_EVENT = 'HUB_ZWAVE_STATUS_EVENT',
	HUB_ZWAVE_EXCEPTION_EVENT = 'HUB_ZWAVE_EXCEPTION_EVENT',
	HUB_ZWAVE_S2_AUTH_REQUEST_EVENT = 'HUB_ZWAVE_S2_AUTH_REQUEST_EVENT',
	HUB_ZWAVE_SECURE_JOIN_RESULT_EVENT = 'HUB_ZWAVE_SECURE_JOIN_RESULT_EVENT',
	ROOM_LIFECYCLE_EVENT = 'ROOM_LIFECYCLE_EVENT',
	RULE_LIFECYCLE_EVENT = 'RULE_LIFECYCLE_EVENT',
}

export class Subscription {
	private logger: any;
	private es: EventSource | undefined;
	private reconnectTimeout: NodeJS.Timeout | undefined;

	constructor(
		private url: string,
		private token: string,
		private app: Application,
		private userId: string,
		logger = console
	) {
		this.logger = logger;

		this.handleEvent = this.handleEvent.bind(this);
		this.reconnect = this.reconnect.bind(this);
		this.connect();
	}

	attachHandlers(es: EventSource) {
		Object.keys(EventType).forEach((eventType) => {
			es.addEventListener(eventType, this.handleEvent);
		});

		es.onopen = () => {
			this.logger.debug('subscription.open', { url: this.url });

			if (this.reconnectTimeout) {
				clearTimeout(this.reconnectTimeout);
			}
			this.reconnectTimeout = setTimeout(this.reconnect, 1000 * 60 * 60 * 3); // reconnect after 3 hours
		};

		es.onmessage = (e) => {
			this.logger.debug('subscription.message', e);
		};

		/**
		 * This usually happens when it's been 5 minutes without an event. In that case
		 * spigot will close the connection and EventSource will auto-reconnect.
		 */
		es.onerror = (e) => {
			this.logger.error('subscription.error', e);
		};
	}

	connect() {
		this.es = new EventSource(this.url, {
			headers: { Authorization: `Bearer ${this.token}` },
		});
		this.attachHandlers(this.es as EventSource);
	}

	reconnect() {
		this.logger.debug('Spigot: reconnecting');
		this.disconnect();
		this.connect();
	}

	handleEvent(evt: any) {
		// this.logger.debug('SSE Event', evt);

		let data = evt.data;
		try {
			data = JSON.parse(evt.data);
		} catch (e) {
			// don't care
		}

		this.dispatch(evt.type, data);
	}

	disconnect() {
		this.es?.close();
	}

	dispatch(type: EventType, data: any) {
		if (type === EventType.DEVICE_EVENT) {
			console.log(data);
		}
	}
}
