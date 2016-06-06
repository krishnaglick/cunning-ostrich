
import DS from 'ember-data';

export default DS.Model.extend({
  house: DS.attr({
    defaultValue() {
      return {
        neighborhood: {},
        schools: {},
        convenience: {}
      };
    }
  })
});
