import app from '../../src/app';

describe("'rooms' service", () => {
	it('registered the service', () => {
		const service = app.service('api/rooms');
		expect(service).toBeTruthy();
	});
});
