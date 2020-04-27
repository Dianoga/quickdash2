import app from '../../src/app';

describe('\'dashboards\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/dashboards');
    expect(service).toBeTruthy();
  });
});
