
import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  router: Ember.inject.service('-router'),
  account: Ember.inject.service(),

  model: {
    email: '',
    password: ''
  },

  actions: {
    async login() {
      const thisForm = Ember.$(this.element).find('.ui.form.segment');
      thisForm.addClass('loading');
      let credentials = this.get('model');
      try {
        await this.get('account').authenticate(credentials);
        this.get('router').transitionTo('houses');
      }
      catch(err) {
        alert('There was an issue logging in.\n', err);
      }
      thisForm.removeClass('loading');
    },

    async register() {
      const thisForm = Ember.$(this.element).find('.ui.form.segment');
      thisForm.addClass('loading');
      let credentials = this.get('model');
      if(!credentials.email || !credentials.password) {
        return alert('You need an email and password!');
      }
      try {
        const account = this.get('account');
        await account.createAccount(credentials);
        await account.authenticate(credentials);
        this.get('router').transitionTo('houses');
      }
      catch(err) {
        alert('Yo, check dis error: ', err.error);
      }
      thisForm.removeClass('loading');
    }
  }
});
