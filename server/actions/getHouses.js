
'use strict';

exports.action = {
  name:                   'getHouses',
  description:            'Gets all the houses for a specific user.',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             ['auth'],

  inputs: {
    id: { required: false }
  },

  run: async function(api, data, next) {
    try {
      data.response = await api.helpers.getHouses(data.email, data.params.id);
      if(data.response.length === 1)
        data.response = data.response[0];
      next();
    }
    catch(err) {
      next(err);
    }
  }
};
