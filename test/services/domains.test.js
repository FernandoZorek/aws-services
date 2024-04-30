const app = require('../../src/app');

describe('\'domains\' service', () => {
  it('registered the service', () => {
    const service = app.service('domains');
    expect(service).toBeTruthy();
  });
});
