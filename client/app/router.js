
import Ember from 'ember';
import config from './config/environment';

Ember.Route.reopen({
  activate: Ember.on('didTransition', function() {
    this._super.apply(this, arguments);
    document.title = this.get('title') || document.title;
  }),
  location: 'hash'
});

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('houses');
});

export default Router;
