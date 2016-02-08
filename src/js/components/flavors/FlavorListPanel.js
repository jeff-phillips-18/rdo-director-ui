import React from 'react';

import FlavorStore from '../../stores/FlavorStore';
import FlavorPanel from './FlavorPanel';

export default class FlavorPanelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flavors: []
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this.setState(FlavorStore.getState());
    FlavorStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    FlavorStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(FlavorStore.getState());
  }

  render() {
    let flavors = this.state.flavors.map((flavor, index) => {
      return (
        <FlavorPanel flavor={flavor} key={index}/>
      );
    });

    return (
      <div className="row">
        <div className="col-sm-12">
          {flavors}
        </div>
      </div>
    );
  }
}

FlavorPanelList.propTypes = {
  currentPlanName: React.PropTypes.string.isRequired,
  parentPath: React.PropTypes.string.isRequired
};

FlavorPanelList.defaultProps = {
  parentPath: '/deployment-plan'
};

