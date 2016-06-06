
import Ember from 'ember';

export default Ember.Controller.extend({
  mode: {
    'manageHouses': true,
    'addHouse': false,
    'editHouse': false
  },
  activeHouse: null,
  navMode(activeItem) {
    Ember.$(`.active.item`).removeClass('active');
    Ember.$(`.item.${activeItem}`).addClass('active');
  },
  //hur
  actions: {
    manageHouses() {
      Ember.run(() => {
        this.set('mode.manageHouses', true);
        this.set('mode.addHouse', false);
        this.set('mode.editHouse', false);
        this.navMode('manageHouses');
      });
    },
    addHouse() {
      Ember.run(() => {
        this.set('mode.manageHouses', false);
        this.set('mode.addHouse', true);
        this.set('mode.editHouse', false);

        this.set('activeHouse', { house: {
          neighborhood: {},
          schools: {},
          convenience: {}
        }});

        this.navMode('addHouse');
      });
    },
    editHouse(house) {
      Ember.run(() => {
        this.set('activeHouse', house);
        this.navMode('manageHouses');
        this.set('mode.manageHouses', false);
        this.set('mode.addHouse', false);
        this.set('mode.editHouse', true);
      });
    }
  }
});
