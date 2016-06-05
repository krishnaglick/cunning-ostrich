
import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

export default Base.extend({
  router: Ember.inject.service('-routing'),
  session: Ember.inject.service(),

  restore({email, token}) {
    return new Ember.RSVP.Promise((res, rej) => {
      if (email && token) {
        Ember.$.ajax({
          url: `${config.apiUrl}/restore`,
          type: 'POST',
          data: { email, token }
        })
        .then((response) => {
          if(!response.authenticated)
            return rej(response.message);
          res({ email, token });
        },
        (err) => {
          this.get('router').transitionTo('login');
          rej(err);
        });
      }
      else {
        this.get('router').transitionTo('login');
        rej();
      }
    });
  },

  authenticate({email, password}) {
    return new Ember.RSVP.Promise((res, rej) => {
      Ember.$.ajax({
        url: `${config.apiUrl}/login`,
        type: 'POST',
        data: JSON.stringify({ email, password }),
        contentType: 'application/json'
      })
      .then((response) => {
        if(!response.token) {
          return rej(response.error);
        }
        this.set('session.token', response.token);
        this.set('session.email', email);
        res({
          token: response.token,
          email
        });
      },
      (xhr) => rej(xhr.responseJSON.message));
    });
  },

  invalidate() {
    return new Ember.RSVP.Promise((res) => {
      this.set('session.token', null);
      this.set('session.email', null);
      res();
    });
  }
});
