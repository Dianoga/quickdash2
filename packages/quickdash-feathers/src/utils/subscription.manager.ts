import fetch from 'node-fetch';

import { Subscription } from './subscription';
import { Application } from '../declarations';
import { LocationData } from '../services/locations/locations.class';

export class SubscriptionManager {
	private subscriptions: { [userId: string]: Subscription } = {};

	constructor(private app: Application) {}

	async subscribe(userId: string, token: string) {
		if (!this.subscriptions[userId]) {
			const user = await this.app.service('api/users').get(userId);
			const token = user.smartthingsSubscribeToken;

			if (!token) throw 'Missing subscribe token';

			const locations = (await this.app
				.service('api/locations')
				.find({ query: { $select: ['locationId'], userId } })) as Pick<
				LocationData,
				'locationId'
			>[];

			try {
				const resp = await fetch(
					'https://api.smartthings.com/v1/subscriptions',
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							name: 'quickdash-feathers',
							version: 1,
							subscriptionFilters: [
								{
									type: 'LOCATIONIDS',
									value: locations.map((l) => l.locationId),
								},
							],
						}),
					}
				);

				const { registrationUrl, ...responseData } = await resp.json();

				if (responseData.error) {
					throw responseData.error;
				}

				this.subscriptions[userId] = new Subscription(
					registrationUrl,
					token,
					this.app,
					userId
				);
			} catch (e) {
				console.error('Unable to setup subscription', e);
			}
		}

		return this.subscriptions[userId];
	}
}
