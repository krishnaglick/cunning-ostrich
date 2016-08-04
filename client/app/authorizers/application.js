
import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: Ember.inject.service(),
  authorize(session, setRequestHeader) {
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(session.token) && !Ember.isEmpty(session.email)) {
      setRequestHeader('token', session.token);
      setRequestHeader('email', session.email);
    }
  }
});
