
import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    Ember.$(this.get('element')).rating({
      initialRating: this.get('rating') || 0,
      maxRating: this.get('maxRating') || 5,
      onRate: (rating, isInit) => {
        if(!isInit)
          this.set('rating', rating);
      },
      clearable: true
    });
    this._super(...arguments);
  }
});
