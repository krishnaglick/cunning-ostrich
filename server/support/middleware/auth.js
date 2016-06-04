
'use strict';

module.exports = {
  name: 'auth',
  global: false,
  priority: 1000,
  preProcessor: function(data, next) {
    let {email, token} = data.params;
    if(email && token) {
      this.helpers.validateToken({email, token})
      .then((email) => {
        data.email = email;
        next();
      })
      .catch((err) => {
        data.connection.rawConnection.responseHttpCode = 401;
        next(err.error);
      });
    }
    else {
      data.connection.rawConnection.responseHttpCode = 401;
      next(new Error('You need to be logged in to use this action!'));
    }
  }
};
