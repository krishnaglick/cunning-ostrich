
'use strict';

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){

    api.bluebird = require('bluebird');
    api.glob = require('globby');

    api.fs = api.bluebird.promisifyAll(require('fs'));
    let pgpOptions = {
      error: function(error, e) {
        console.log(`Query Error\n`, error, `\nQuery Details\n`, e);
      },
      promiseLib: api.bluebird
    };

    api.pgp = require('pg-promise')(pgpOptions);

    api._ = require('lodash');

    next();
  },
  start: function(api, next) {
    api.db = api.pgp(api.config.connectionInfo);
    next();
  },
  stop: function(api, next) {
    api.pgp.end();
    next();
  }
};
