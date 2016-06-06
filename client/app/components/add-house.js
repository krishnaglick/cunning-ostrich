
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    collapse() {
      Ember.$(this.get('element')).slideToggle();
    },
    save() {
      if(!this.model.save)
        this.set('model', this.get('store').createRecord('house', this.get('model')));
      this.model.save();
    }
  }
});