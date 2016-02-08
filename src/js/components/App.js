import React from 'react';


import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.element
};

export default DragDropContext(HTML5Backend)(App);