import * as _ from 'lodash';
import BaseStore from './BaseStore';
import FlavorStore from './FlavorStore';
import Roles from '../data/Roles';

class RoleStore extends BaseStore {
  constructor() {
    super();
    this.state = {
      roles: Roles
    };
    this.state.unassignedRoles =  this.determineUnassignedRoles();

    this.changeListener = this._onChange.bind(this);
    FlavorStore.addChangeListener(this.changeListener);
  }

  _registerToActions(payload) {
  }

  _onChange() {
    this.state.unassignedRoles = this.determineUnassignedRoles();
    this.emitChange();
  }

  determineUnassignedRoles() {
    var flavors = FlavorStore.getState().flavors;
    var roles = this.state.roles.slice(0);
    var foundRole;
    _.forEach(roles, function(role) {
      role.flavor = null;
    });
    _.forEach(flavors, function(flavor) {
      _.forEach(flavor.roles, function(flavorRole) {
        foundRole = _.find(roles, {name: flavorRole.name});
        if (foundRole) {
          foundRole.flavor = flavor;
        }
      });
    });
    return _.filter(roles, {flavor: null});
  }

  getState() {
    return this.state;
  }
}

export default new RoleStore();
