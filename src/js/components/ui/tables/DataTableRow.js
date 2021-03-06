import React from 'react';

export default class DataTableRow extends React.Component {
  render() {
    let cells = this.props.columns.map((column, index) => {
      return React.cloneElement(column.props.cell, { rowIndex: this.props.index, key: index });
    });
    return (
      <tr>{cells}</tr>
    );
  }
}
DataTableRow.propTypes = {
  columns: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired
};
