import app from '../../src/app';

describe("'device-statuses' service", () => {
	it('registered the service', () => {
		const service = app.service('api/device-statuses');
		expect(service).toBeTruthy();
	});
});
