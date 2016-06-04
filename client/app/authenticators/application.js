
import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

export default Base.extend({
  router: Ember.inject.service('-routing'),

  restore({email, token}) {
    return new Ember.RSVP.Promise((res, rej) => {
      if (email && token) {
        Ember.$.ajax({
          url: `${config.apiUrl}/restore`,
          type: 'POST',
          data: { email, token }
        })
        .then((response) => {
          Ember.run(() => {
            if(response.authenticated) {
              res({ email, token });
            }
            else {
              rej(response.message);
            }
          });
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
        Ember.run(() => {
          if(response.token) {
            res({
              token: response.token,
              email
            });
          }
          else {
            rej(response.error);
          }
        });
      },
      (xhr) => {
        Ember.run(() => {
          rej(xhr.responseJSON.message);
        });
      });
    });
  },

  invalidate() {
    return new Ember.RSVP.Promise((res, rej) => {
      this.set('session.token', null);
      this.set('session.email', null);
      res();
    });
  }
});
