import React from 'react';
import ClassNames from 'classnames';
import { DropTarget } from 'react-dnd';

import RolesActions from '../../actions/RolesActions';
import RoleStore from '../../stores/RoleStore';

const roleTarget = {
  drop(props) {
    return {
      flavor: props.flavor
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isDragging: monitor.getItemType() === 'role'
  };
}

class FlavorAssignRole extends React.Component {
  constructor() {
    super();
    this.state = {
      flavor: false,
      availableRoles: RoleStore.getState().unassignedRoles,
      availableRolesListVisible: false
    };
    this.changeListener = this._onChange.bind(this);
    this._hideAvailableRolesList = this.hideAvailableRolesList.bind(this);
  }

  componentDidMount() {
    this.setState({availableRoles: RoleStore.getState().unassignedRoles});
    RoleStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    RoleStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({availableRoles: RoleStore.getState().unassignedRoles});
  }

  assignRole(role) {
    RolesActions.assignRole(this.props.flavor, role);
  }

  hideAvailableRolesList () {
    this.setState({ availableRolesListVisible: false });
    document.removeEventListener('click', this._hideAvailableRolesList);
  }

  showAvailableRolesList () {
    this.setState({ availableRolesListVisible: true });
    document.addEventListener('click', this._hideAvailableRolesList);
  }

  render () {
    const {connectDropTarget, isDragging} = this.props;

    let assignRoleItem = false;
    if (this.state.availableRoles && this.state.availableRoles.length > 0) {
      let items = this.state.availableRoles.map((role, index) => {
        return (
          <li key={index}>
            <a href="#" onClick={this.assignRole.bind(this, role)}>{role.name}</a>
          </li>
        );
      });

      let classes = ClassNames({
        'deployment-roles' : true,
        'deployment-roles-assignable' : true
      });

      let menuClasses = ClassNames({
        'dropdown': true,
        'role-target': true,
        'ui-droppable' : true,
        'role-target-active' : isDragging,
        'open': this.state.availableRolesListVisible
      });


      assignRoleItem = connectDropTarget (
        <ul className={classes}>
          <li className={menuClasses}>
            <a href="#" onClick={this.showAvailableRolesList.bind(this)}>
              <i className="fa fa-plus"></i> Assign Role
            </a>
            <ul className="dropdown-menu" role="menu">
              {items}
            </ul>
          </li>
        </ul>
      );
    }
    return assignRoleItem;
  }
}
FlavorAssignRole.propTypes = {
  flavor: React.PropTypes.object.isRequired
};

export default DropTarget('role', roleTarget, collect)(FlavorAssignRole);
