import app from '../../src/app';

describe("'quickdash' service", () => {
	it('registered the service', () => {
		const service = app.service('api/quickdash');
		expect(service).toBeTruthy();
	});
});
