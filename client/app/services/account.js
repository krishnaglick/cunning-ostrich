import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  async createAccount(credentials) {
    return Ember.$.post({
      url: '/api/register',
      data: credentials,
      type: 'POST'
    });
  },

  async authenticate(credentials) {
    return this.get('session')
    .authenticate('authenticator:application', credentials);
  }
});
