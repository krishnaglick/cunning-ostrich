
'use strict';

exports.action = {
  name:                   'saveHouses',
  description:            'Saves the given houses.',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             ['auth'],

  inputs: {
    house: { required: true },
    id: { required: false }
  },

  run: async function(api, data, next) {
    try {
      await api.helpers.saveHouses(data.email, data.params);
      data.response.id = data.params.id;
      next();
    }
    catch(err) {
      next(err);
    }
  }
};
