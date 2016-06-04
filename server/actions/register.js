'use strict';

exports.action = {
  name:                   'register',
  description:            'register',
  blockedConnectionTypes: [],
  outputExample:          {},
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
      await api.helpers.register(data.params);
      const token = await api.helpers.generateToken(data.params);
      data.response.token = token;
      next();
    }
    catch(x) {
      next(x);
    }
  }
};
