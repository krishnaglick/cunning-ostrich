
import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  router: Ember.inject.service('-router'),
  actions: {
    logout() {
      try {
        this.get('session').invalidate();
      }
      catch(x) {
        debugger;
      }
      this.get('router').transitionTo('login');
    }
  }
});