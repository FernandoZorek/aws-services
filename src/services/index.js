const domains = require('./domains/domains.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(domains);
};
