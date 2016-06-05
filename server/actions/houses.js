'use strict';

exports.action = {
  name:                   'houses',
  description:            'houses',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             ['auth'],

  inputs: {},

  run: async function(api, data, next) {
    try {
      data.response = await api.helpers.getHouses(data.email);
      next();
    }
    catch(err) {
      next(err);
    }
  }
};
