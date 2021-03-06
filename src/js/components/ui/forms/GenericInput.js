import ClassNames from 'classnames';
import Formsy from 'formsy-react';
import React from 'react';

class GenericInput extends React.Component {
  changeValue(event) {
    this.props.setValue(event.target.value);
  }

  renderErrorMessage() {
    let errorMessage = this.props.getErrorMessage();
    return errorMessage ? (
      <span className='help-block'>{errorMessage}</span>
    ) : false;
  }

  renderDescription() {
    let description = this.props.description;
    return description ? (
      <small className='help-block'>{description}</small>
    ) : false;
  }

  render() {
    let divClasses = ClassNames({
      'form-group': true,
      'has-error': this.props.showError(),
      'has-success': this.props.isValid(),
      'required': this.props.isRequired()
    });

    return (
      <div className={divClasses}>
        <label htmlFor={this.props.name} className="control-label">{this.props.title}</label>
        <input type={this.props.type}
               name={this.props.name}
               ref={this.props.name}
               id={this.props.name}
               className="form-control"
               onChange={this.changeValue.bind(this)}
               value={this.props.getValue()}
               placeholder={this.props.placeholder} />
        {this.renderErrorMessage()}
        {this.renderDescription()}
      </div>
    );
  }
}
GenericInput.propTypes = {
  description: React.PropTypes.string,
  getErrorMessage: React.PropTypes.func,
  getValue: React.PropTypes.func,
  isRequired: React.PropTypes.func,
  isValid: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  setValue: React.PropTypes.func,
  showError: React.PropTypes.func,
  title: React.PropTypes.string.isRequired,
  type: React.PropTypes.string
};
GenericInput.defaultProps = {
  type: 'text'
};
export default Formsy.HOC(GenericInput);
