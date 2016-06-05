
import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    if(!this.get('model'))
      this.set('model', this.get('store').createRecord('house'));
    this._super.call(this, arguments);
  },
  actions: {
    save() {
      debugger;
    }
  }
});