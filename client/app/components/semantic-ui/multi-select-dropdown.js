
import Ember from 'ember';

export default Ember.Component.extend({
  activeSelection: [],
  defaultValue: 'INTERNALTIONALIZE ME',
  didRender() {
    this._super(...arguments);
    Ember.$('.ui.dropdown').dropdown({
      action: 'activate',
      onChange() {
        this.activeSelection = Ember.$('.ui.dropdown').dropdown('get value') || [];
      }
    });
  }
});
