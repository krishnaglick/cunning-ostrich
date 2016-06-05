
'use strict';

module.exports = {
  name: 'auth',
  global: false,
  priority: 1000,
  preProcessor: function(data, next) {
    let {email, token} = data.params;
    if(!email && !token)
      ({email, token} = data.connection.rawConnection.req.headers);
    if(email && token) {
      this.helpers.validateToken({email, token})
      .then((result) => {
        if(result) {
          data.email = email;
          next();
        }
        else {
          next(new Error('Issue validating session, see admin!'));
        }
      })
      .catch((err) => {
        data.connection.rawConnection.responseHttpCode = 401;
        next(err.error);
      });
    }
    else {
      next(new Error('Need to provide both email and token!'));
    }
  }
};
