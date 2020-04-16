import app from '../../src/app';

describe("'locations' service", () => {
	it('registered the service', () => {
		const service = app.service('api/locations');
		expect(service).toBeTruthy();
	});
});
