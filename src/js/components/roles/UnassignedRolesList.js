import React from 'react';
import ClassNames from 'classnames';
import { DropTarget } from 'react-dnd';

import DraggableRole from './DraggableRole';

const roleTarget = {
  drop(props) {
    return {
      flavor: null
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

export class UnassignedRolesList extends React.Component {
  render() {
    const {connectDropTarget, isDragging} = this.props;
    let roles = this.props.roles.map((role, index) => {
      var roleComponent = false;
      if (role.flavor === null) {
        roleComponent = (
            <DraggableRole key={index}
                           role={role}
                           isDragging={false}/>
        );
      }
      return roleComponent;
    });
    let classes = ClassNames({
      'deployment-roles' : true,
      'deployment-roles-unassigned' : true,
      'ui-droppable' : true,
      'deployment-roles-active' : isDragging
    });
    return connectDropTarget(
      <ul className={classes}>
        {roles}
      </ul>
    );
  }
}
UnassignedRolesList.propTypes = {
  roles: React.PropTypes.array.isRequired
};

export default DropTarget('role', roleTarget, collect)(UnassignedRolesList);
