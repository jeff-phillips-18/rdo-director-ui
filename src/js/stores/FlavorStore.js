import BaseStore from './BaseStore';
import Flavors from '../data/Flavors';

class FlavorStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      flavors: Flavors
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case 'UPDATE_FLAVOR_ROLE':
      this.updateFlavorRole(payload.flavor, payload.role);
      break;
    case 'ASSIGN_FLAVOR_ROLE':
      this.assignFlavorRole(payload.flavor, payload.role);
      break;
    case 'UNASSIGN_FLAVOR_ROLE':
      this.unassignFlavorRole(payload.flavor, payload.role);
      break;
    default:
      break;
    }
  }

  updateFlavorRole(flavor, role) {
    let stateFlavor = this.state.flavors.find(function(nextFlavor) {
      return (flavor.name === nextFlavor.name);
    });
    if (stateFlavor) {
      stateFlavor.roles.filter((r) => { r.name == role.name; })[0] = role;
      stateFlavor.freeNodeCount = this._calculateFreeNodes(stateFlavor);
      this.emitChange();
    }
  }

  assignFlavorRole(flavor, role) {
    let stateFlavor = this.state.flavors.find(function(nextFlavor) {
      return (flavor.name === nextFlavor.name);
    });
    if (stateFlavor) {
      let flavorRole = {
        name: role.name,
        nodeCount: 1
      };
      stateFlavor.roles.push(flavorRole);
      stateFlavor.freeNodeCount = this._calculateFreeNodes(stateFlavor);
      this.emitChange();
    }
  }

  unassignFlavorRole(flavor, role) {
    let stateFlavor = this.state.flavors.find(function(nextFlavor) {
      return (flavor.name === nextFlavor.name);
    });
    if (stateFlavor) {
      stateFlavor.roles = stateFlavor.roles.filter(function(nextRole) {
        return nextRole.name !== role.name;
      });
      stateFlavor.freeNodeCount = this._calculateFreeNodes(stateFlavor);
      this.emitChange();
    }
  }

  _calculateFreeNodes(flavor) {
    let reserved = 0;
    flavor.roles.forEach((role) => { reserved += role.nodeCount; });
    return flavor.nodeCount - reserved;
  }

  getState() {
    this.state.flavors.forEach((flavor) => {
      flavor.freeNodeCount = this._calculateFreeNodes(flavor);
    });
    return this.state;
  }
}

export default new FlavorStore();
