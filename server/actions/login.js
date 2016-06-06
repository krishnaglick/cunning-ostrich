
'use strict';

exports.action = {
  name:                   'login',
  description:            'I handle logging into the app',
  blockedConnectionTypes: [],
  outputExample:          {
    token: 'a token'
  },
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {
    email: { required: true },
    password: { required: true }
  },

  run: async function(api, data, next) {
    try {
      const validUser = await api.helpers.validatePassword(data.params);
      if(!validUser) {
        throw new Error('Invalid username or password');
      }
      const token = await api.helpers.generateToken(data.params);
      data.response.token = token;
      next();
    }
    catch(x) {
      next(x);
    }
  }
};
