import React from 'react';

export default class DeploymentStep extends React.Component {

  render() {
    let children = false;
    if (this.props.children) {
      children = React.cloneElement(this.props.children,
        {currentPlanName: this.props.currentPlanName});
    }
    return (
      <li>
        <h3>
          <span>{this.props.title}</span>
        </h3>
        <div className="row">
          <div className="col-sm-12">
            <span className="deployment-step-subtitle">{this.props.subTitle}</span>
            {this.props.links}
          </div>
          <div className="col-sm-12">
            {children}
          </div>
        </div>
      </li>
    );
  }
}

DeploymentStep.propTypes = {
  children: React.PropTypes.node,
  currentPlanName: React.PropTypes.string.isRequired,
  links: React.PropTypes.array,
  subTitle: React.PropTypes.string,
  title: React.PropTypes.string.isRequired
};
