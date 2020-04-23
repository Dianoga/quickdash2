import { Subscription } from './subscription';
import { Application } from '../declarations';
import { LocationData } from '../services/locations/locations.class';

export class SubscriptionManager {
	private subscriptions: { [userId: string]: Subscription } = {};

	constructor(private app: Application) {}

	async subscribe(userId: string) {
		if (!this.subscriptions[userId] || !this.subscriptions[userId].stillAlive) {
			const user = await this.app.service('api/users').get(userId);
			const token = user.smartthingsSubscribeToken;

			if (!token) throw 'Missing subscribe token';

			const locations = (await this.app
				.service('api/locations')
				.find({ query: { $select: ['locationId'], userId } })) as Pick<
				LocationData,
				'locationId'
			>[];

			const subscriptionFilters = [
				{
					type: 'LOCATIONIDS',
					value: locations.map((l) => l.locationId),
				},
			];
			this.subscriptions[userId] = new Subscription(
				token,
				this.app,
				userId,
				subscriptionFilters
			);
		}

		return this.subscriptions[userId];
	}
}
