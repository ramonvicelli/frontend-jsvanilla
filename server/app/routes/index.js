const api = require('../api');

module.exports = function (app) {

  app.route('/negotiation/week')
    .get(api.week);

  app.route('/negotiation/lastweek')
    .get(api.lastWeek);

  app.route('/negotiation/delayedweek')
    .get(api.delayedWeek);

  app.route('/negotiation')
    .post(api.add);
};
