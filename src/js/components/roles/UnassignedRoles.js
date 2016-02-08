import React from 'react';

import UnassignedRolesList from './UnassignedRolesList';
import RoleStore from '../../stores/RoleStore';

export default class UnassignedRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: []
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this.setState({roles: RoleStore.getState().unassignedRoles});
    RoleStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    RoleStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({roles: RoleStore.getState().unassignedRoles});
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-default flavor-panel">
            <div className="panel-heading">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="h5">Unassigned Roles</h3>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <UnassignedRolesList roles={this.state.roles}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
