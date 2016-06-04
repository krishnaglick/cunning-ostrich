'use strict';

exports.action = {
  name:                   'changePassword',
  description:            'changePassword',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             ['auth'],

  inputs: {
    email: { required: true },
    password: { required: true },
    newPassword: { required: true }
  },

  run: async function(api, data, next) {
    await api.helpers.changePassword(data.params);
    next();
  }
};
