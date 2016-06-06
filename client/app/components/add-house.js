
import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    Ember.run(() => {
      let id = this.get('houseID');
      if(Ember.isEmpty(id)) {
        const record = this.get('store').createRecord('house');
        this.set('model', record);
      }
      else {
        this.get('store').findRecord('house', id)
        .then((record) => {
          this.set('model', record);
        });
      }
      this._super(...arguments);
    });
  },
  actions: {
    collapse() {
      Ember.$(this.get('element')).slideToggle();
    },
    save() {
      this.model.save();
    }
  }
});