
'use strict';

exports.action = {
  name:                   'restore',
  description:            'restore',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             ['auth'],

  inputs: {},

  run: function(api, data, next) {
    var error = null;
    //If it gets here the user's auth token is still valid.
    data.response.authenticated = true;
    next(error);
  }
};
