import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
  updateRole(flavor, role) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_FLAVOR_ROLE',
      flavor: flavor,
      role: role
    });
  },
  assignRole(flavor, role) {
    AppDispatcher.dispatch({
      actionType: 'ASSIGN_FLAVOR_ROLE',
      flavor: flavor,
      role: role
    });
  },
  unassignRole(flavor, role) {
    AppDispatcher.dispatch({
      actionType: 'UNASSIGN_FLAVOR_ROLE',
      flavor: flavor,
      role: role
    });
  }
};
