import React from 'react';
import ClassNames from 'classnames';

import FlavorAssignRole from './FlavorAssignRole';
import DraggableRole from '../roles/DraggableRole';

export default class FlavorPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      flavor: false
    };
  }

  componentWillMount() {
    this.setState({flavor: this.props.flavor});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({flavor: nextProps.flavor});
  }

  render() {
    let roles = this.state.flavor.roles.map((role, index) => {
      return (
        <DraggableRole key={index}
                       role={role}
                       flavor={this.state.flavor}
                       isDragging={false}/>
      );
    });
    let classes = ClassNames({
      'deployment-roles' : true,
      'deployment-roles-assigned' : true
    });

    return (
      <div className="panel panel-default flavor-panel">
        <div className="panel-heading">
          <div className="row">
            <div className="col-sm-5 col-md-4">
              <h3 className="h5">{this.state.flavor.name}</h3>
            </div>
            <div className="col-sm-7 col-md-8">
              <h4 className="h5">{this.state.flavor.freeNodeCount} Free Nodes</h4>
            </div>
            <div className="col-sm-12">
              <small className='subheader'> {this.state.flavor.hwSpecs}</small>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <ul className={classes}>
            {roles}
            <FlavorAssignRole flavor={this.state.flavor} />
          </ul>
        </div>
      </div>
    );
  }
}
FlavorPanel.propTypes = {
  flavor: React.PropTypes.object.isRequired
};
