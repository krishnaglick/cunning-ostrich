
import Ember from 'ember';

export default Ember.Component.extend({
  maxRating: 5,
  type: '',
  didInsertElement() {
    const type = this.get('type');
    Ember.$(`.ui.rating${type ? `.${type}` : type}`).rating({
      onRate: (rating) => {
        this.set('rating', rating);
      }
    });
  }
});
