
import Ember from 'ember';

export default Ember.Controller.extend({
  mode: {
    'manageHouses': true,
    'addHouse': false,
    'editHouse': false
  },
  activeHouse: null,
  //hur
  manageHouses() {
    let mode = this.get('mode');
    mode.manageHouses = true;
    mode.addHouse = false;
    mode.editHouse = false;
    this.set('mode', mode);
  },
  addHouse() {
    let mode = this.get('mode');
    mode.manageHouses = false;
    mode.addHouse = true;
    mode.editHouse = false;
    this.set('mode', mode);
  },
  editHouse(house) {
    this.set('activeHouse', house);

    let mode = this.get('mode');
    mode.manageHouses = false;
    mode.addHouse = false;
    mode.editHouse = true;
    this.set('mode', mode);
  }
});
