
import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    Ember.run(() => {
      Ember.$(this.get('element')).rating({
        onRate: (rating) => {
          this.set('rating', rating);
        },
        initialRating: this.get('rating') ||0,
        maxRating: this.get('maxRating') || 5
      });
    });
  }
});
