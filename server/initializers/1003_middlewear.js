
'use strict';

module.exports = {
  loadPriority:  1003,
  startPriority: 1003,
  stopPriority:  1003,
  initialize: function(api, next) {
    let path = require('path');
    api.glob(path.resolve('./support/middleware/*.js'))
    .then((files) => {
      files.forEach((file) => {
        try {
          let middleware = require(file);
          Object.keys(middleware).forEach((key) => {
            if(typeof middleware[key] === 'function')
              middleware[key] = middleware[key].bind(api);
          });
          api.actions.addMiddleware(middleware);
        }
        catch(x) {
          console.log(x);
        }
      });
      next();
    })
    .catch(next);
  },
  start: function(api, next) {
    next();
  },
  stop: function(api, next) {
    next();
  }
};
