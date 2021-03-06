import React from 'react';
import invariant from 'invariant';

import DataTableRow from './DataTableRow';

export default class DataTable extends React.Component {
  _getColumns() {
    let columns = [];
    React.Children.forEach(this.props.children, (child) => {
      if (child == null) {
        return;
      }
      invariant(
        child.type.name === 'DataTableColumn',
        'DataTable child type should be <DataTableColumn />'
      );
      columns.push(child);
    });
    return columns;
  }

  onFilterTable(event) {
    this.props.onFilter(event.target.value);
  }

  renderFilterInput() {
    if (this.props.onFilter) {
      return (
        <div className="dataTables_filter">
          <label>
            <input type="search"
                   className=""
                   placeholder={'Filter'}
                   title={'Filter'}
                   value={this.props.filterString}
                   onChange={this.onFilterTable.bind(this)}/>
          </label>
        </div>
      );
    }
    return false;
  }

  renderTableActions() {
    if(this.props.tableActions) {
      return (
        <div className="dataTables_actions">
          {this.props.tableActions()}
        </div>
      );
    }
  }

  render() {
    let columns = this._getColumns();

    let headers = columns.map((column) => {
      return column.props.header;
    });

    let rows = [];
    for (var i = 0; i < this.props.rowsCount; ++i) {
      rows[i] = (
        <DataTableRow key={i} index={i} columns={columns}/>
      );
    }

    return (
      <div className="dataTables_wrapper">
        <div className="dataTables_header">
          {this.renderFilterInput()}
          {this.renderTableActions()}
          <div className="dataTables_info">
            Showing <b>{rows.length}</b> of <b>{this.props.data.length}</b> items
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-stripped table-bordered datatable" role="grid">
            <thead>
              <tr>
                {headers}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? rows : this.props.noRowsRenderer()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
DataTable.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  data: React.PropTypes.array.isRequired,
  filterString: React.PropTypes.string,
  noRowsRenderer: React.PropTypes.func.isRequired,
  onFilter: React.PropTypes.func,
  rowsCount: React.PropTypes.number.isRequired,
  tableActions: React.PropTypes.func
};
DataTable.defaultProps = {
  className: 'table'
};
