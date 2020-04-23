import EventSource from 'eventsource';
import fetch from 'node-fetch';

import { Application } from '../declarations';
import { SpigotEvent } from '../typings/events';
import { DeviceStatusData } from '../services/device-statuses/device-statuses.class';
import { buildStatusId } from '../hooks/build-status-id';

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
	private url: string | undefined;
	private logger: any;
	private es: EventSource | undefined;
	private reconnectTimeout: NodeJS.Timeout | undefined;

	private subscribeAttempts: number;
	private subscribeMaxAttempts: number;

	public stillAlive: boolean;

	constructor(
		private token: string,
		private app: Application,
		private userId: string,
		private subscriptionFilters: any,
		logger = console
	) {
		this.logger = logger;

		this.subscribeAttempts = 0;
		this.subscribeMaxAttempts = 10;
		this.stillAlive = true;

		if (!userId) throw new Error('Missing user id');

		this.handleEvent = this.handleEvent.bind(this);
		this.reconnect = this.reconnect.bind(this);
		this.subscribe();
	}

	attachHandlers(es: EventSource) {
		Object.keys(EventType).forEach((eventType) => {
			es.addEventListener(eventType, this.handleEvent);
		});

		es.onopen = () => {
			this.logger.debug('Spigot:open', { url: this.url });

			if (this.reconnectTimeout) {
				clearTimeout(this.reconnectTimeout);
			}
			this.reconnectTimeout = setTimeout(this.reconnect, 1000 * 60 * 60 * 3); // reconnect after 3 hours
		};

		es.onmessage = (e) => {
			this.logger.debug('Spigot:message', e);
		};

		/**
		 * This usually happens when it's been 5 minutes without an event. In that case
		 * spigot will close the connection and EventSource will auto-reconnect.
		 */
		es.onerror = (e: any) => {
			this.logger.error('Spigot:error', e);
			if (e.status === 403) {
				this.subscribe();
			}
		};
	}

	async subscribe() {
		if (this.subscribeAttempts > this.subscribeMaxAttempts) {
			this.stillAlive = false;
			console.error(new Error('Max subscription attempts exceeded'));
			return;
		}

		if (this.subscribeAttempts > 0) {
			const waitTime = 2 ^ this.subscribeAttempts;
			this.subscribeAttempts++;
			await new Promise((resolve) => {
				setTimeout(resolve, waitTime * 1000);
			});
		}

		try {
			const resp = await fetch('https://api.smartthings.com/v1/subscriptions', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
				body: JSON.stringify({
					name: 'quickdash-feathers',
					version: 1,
					subscriptionFilters: this.subscriptionFilters,
				}),
			});

			const { registrationUrl, ...responseData } = await resp.json();

			if (responseData.error) {
				throw responseData.error;
			}

			this.url = registrationUrl;
			this.connect();
			this.subscribeAttempts = 0;
		} catch (e) {
			console.error('Unable to setup subscription', e);
		}
	}

	connect() {
		if (!this.url) throw Error('Missing URL');

		this.es = new EventSource(this.url, {
			headers: { Authorization: `Bearer ${this.token}` },
		});
		this.attachHandlers(this.es as EventSource);
	}

	reconnect() {
		this.logger.debug('Spigot:reconnecting');
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

		this.safeDispatch(evt.type, data);
	}

	disconnect() {
		this.es?.close();
	}

	safeDispatch(type: EventType, eventData: SpigotEvent) {
		try {
			this.dispatch(type, eventData);
		} catch (e) {
			console.error('spigot:event-error', e);
		}
	}

	dispatch(type: EventType, eventData: SpigotEvent) {
		const params = { user: { _id: this.userId } };

		if (type === EventType.DEVICE_EVENT) {
			const e = eventData.deviceEvent;

			const id = buildStatusId({
				deviceId: e.deviceId,
				componentId: e.componentId,
				capabilityId: e.capability,
				attributeName: e.attribute,
			});
			const data: Partial<DeviceStatusData> = {
				value: e.value,
			};
			this.app.service('api/device-statuses').patch(id, data, params);
		}
	}
}
