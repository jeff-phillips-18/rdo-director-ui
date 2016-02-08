import React from 'react';
import { Link } from 'react-router';
import { DragSource } from 'react-dnd';
import ClassNames from 'classnames';

import RolesActions from '../../actions/RolesActions';
import Touchspin from '../ui/Touchspin';

const roleSource = {
  beginDrag(props) {
    return {
      role: props.role,
      flavor: props.flavor
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && (dropResult.flavor !== item.flavor)) {
      if (item.flavor) {
        RolesActions.unassignRole(item.flavor, item.role);
      }
      if (dropResult.flavor) {
        RolesActions.assignRole(dropResult.flavor, item.role);
      }
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DraggableRole extends React.Component {
  constructor() {
    super();
    this.state = {
      nodeCount: 0,
      availableCount: 0
    };
  }

  componentWillMount() {
    this.setState({
      nodeCount: this.props.role.nodeCount,
      availableCount: this.props.flavor ? this.props.flavor.freeNodeCount : 0
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nodeCount: nextProps.role.nodeCount,
      availableCount: nextProps.flavor ? nextProps.flavor.freeNodeCount : 0
    });
  }

  updateNodeCount(value) {
    this.props.role.nodeCount = value;
    RolesActions.updateRole(this.props.flavor, this.props.role);
  }

  handleDelete() {
    RolesActions.unassignRole(this.props.flavor, this.props.role);
  }

  render() {

    let classes = {
      'role': true,
      'role-assigned': this.props.flavor,
      'ui-draggable ui-draggable-handle': true,
      'role-dragging' : this.props.isDragging
    };
    classes['role-' + this.props.role.name.toLowerCase().replace(/ /g, '-')] = true;
    let classNames = ClassNames(classes);
    let nodeCount = false;
    if (this.props.flavor) {
      nodeCount = (
        <div className="node-count">
          <Touchspin value={this.state.nodeCount}
                     onChange={this.updateNodeCount.bind(this)}
                     min={1}
                     max={this.state.nodeCount + this.state.availableCount}
                     step={this.props.role.name.toLowerCase() === 'controller' ? 2 : 1}
                     stepIntervalDelay={500}/>
        </div>
      );
    }
    let deleteButton = false;
    if (this.props.flavor) {
      deleteButton = (
        <a href="#" className="role-option delete" onClick={this.handleDelete.bind(this)}>
          <i className="fa fa-times"></i>
        </a>
      );
    }
    return this.props.connectDragSource(
      <li className={classNames}>
        <div className="deployment-role-label">
          {this.props.role.name}
        </div>
        {nodeCount}
        {deleteButton}
        <Link to={'/deployment-plan/parameters'}
              type="button"
              className="role-option edit">
          <i className="fa fa-pencil"></i>
        </Link>
      </li>
    );
  }
}

DraggableRole.propTypes = {
  connectDragSource: React.PropTypes.func.isRequired,
  flavor: React.PropTypes.object,
  isDragging: React.PropTypes.bool,
  role: React.PropTypes.object.isRequired
};

DraggableRole.defaultProps = {
  isDragging: false
};

export default DragSource(props => 'role', roleSource, collect) (DraggableRole);

