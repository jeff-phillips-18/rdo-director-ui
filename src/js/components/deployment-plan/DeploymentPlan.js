import { Link } from 'react-router';
import React from 'react';

import DeploymentStep from './DeploymentStep';
import FlavorStore from '../../stores/FlavorStore';
import Loader from '../ui/Loader';
import NoPlans from './NoPlans';
import NotificationActions from '../../actions/NotificationActions';
import PlansStore from '../../stores/PlansStore';
import FlavorListPanel from '../flavors/FlavorListPanel';
import TripleOApiService from '../../services/TripleOApiService';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';
import UnassignedRoles from '../roles/UnassignedRoles';

export default class DeploymentPlan extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPlanName: PlansStore.getCurrentPlanName(),
      readyToDeploy: false,
      flavors: []
    };
    this.changeListener = this._onChange.bind(this);
    this.flavorsChangeListener = this._onFlavorsChange.bind(this);
  }

  componentDidMount() {
    this.setState({flavors: FlavorStore.getState().flavors});
    FlavorStore.addChangeListener(this.flavorsChangeListener);
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    FlavorStore.removeChangeListener(this.flavorsChangeListener);
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ currentPlanName: PlansStore.getCurrentPlanName() });
  }

  _onFlavorsChange() {
    this.setState({ currentPlanName: PlansStore.getCurrentPlanName() });
  }

  handleDeploy() {
    TripleOApiService.deployPlan(this.state.currentPlanName).then((response) => {
      this.setState({ parameters: response.parameters });
      NotificationActions.notify({
        title: 'Deployment started',
        message: 'The Deployment has been successfully initiated',
        type: 'success'
      });
    }).catch((error) => {
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  render() {
    let deploymentConfigLinks = [
      <Link className="btn btn-link" key="1" to={'/' + this.props.route.path + '/environment'}>
        Edit Configuration
      </Link>
    ];

    let createRegisterLinks = [
      <Link className="btn btn-link" key="2" to={'/' + this.props.route.path + '/parameters'}>
        Create Favor
      </Link>,
      <Link className="btn btn-link" key="3" to={'/' + this.props.route.path + '/register'}>
        Register Nodes
      </Link>
    ];

    let roleConfigLinks = [
      <Link className="btn btn-link" key="4" to={'/' + this.props.route.path + '/parameters'}>
        Edit Parameters
      </Link>
    ];

    let children = false;
    if (this.props.children) {
      children = React.cloneElement(this.props.children,
        {currentPlanName: this.state.currentPlanName, parentPath: '/' + this.props.route.path});
    }

    // TODO: Detemerine the real deployment configuration descriptions string
    let deploymentConfigDescription = 'KVM, Neutron with VLAN, Ceph (Default)';

    return (
      <div className="row">
        <Loader loaded={PlansStore.getState().plansLoaded}
                content="Loading Deployments..."
                global>
          {this.state.currentPlanName ? (
            <div className="col-sm-12 deployment-step-list">
              <div className="page-header">
                <h1>{this.state.currentPlanName}</h1>
              </div>
              <ol className="deployment-step-list">
                <DeploymentStep title="Specify Deployment Configuration"
                                currentPlanName={this.state.currentPlanName}
                                subTitle={deploymentConfigDescription}
                                links={deploymentConfigLinks}/>
                <DeploymentStep title="Create Flavors and Register Nodes"
                                currentPlanName={this.state.currentPlanName}
                                links={createRegisterLinks}
                                subTitle={this.state.flavors.length > 0 ?
                                 '' : 'There are no flavors or nodes currently.'}>
                  <FlavorListPanel parentPath={'/' + this.props.route.path}
                                   currentPlanName={this.state.currentPlanName}/>
                </DeploymentStep>
                <DeploymentStep title="Configure and Assign Roles"
                                currentPlanName={this.state.currentPlanName}
                                subTitle="Parameters for all roles can be configured."
                                links={roleConfigLinks}>
                  <UnassignedRoles />
                </DeploymentStep>
                <DeploymentStep title="Deploy"
                                currentPlanName={this.state.currentPlanName}>
                  <div className="actions pull-left">
                    <a className={'link btn btn-primary btn-lg ' +
                                  (this.state.readyToDeploy ? '' : 'disabled')}
                       onClick={this.handleDeploy.bind(this)}>
                      <span className="fa fa-send"/> Verify and Deploy
                    </a>
                  </div>
                </DeploymentStep>
              </ol>
            </div>
          ) : (
            <div className="col-sm-12">
              <NoPlans/>
            </div>
          )}
        </Loader>
        {children}
      </div>
    );
  }
}

DeploymentPlan.propTypes = {
  children: React.PropTypes.node,
  route: React.PropTypes.object
};
