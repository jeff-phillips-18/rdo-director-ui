import React from 'react';

export default class Touchspin extends React.Component {
  constructor () {
    super();
    this.state = {
      value: 0
    };

    this._stopSpin = this.stopSpin.bind(this);
    this._upTimeoutCB = this.upTimeoutCB.bind(this);
    this._upIntervalCB = this.upIntervalCB.bind(this);
    this._downTimeoutCB = this.downTimeoutCB.bind(this);
    this._downIntervalCB = this.downIntervalCB.bind(this);
  }

  componentWillMount () {
    this.setState({value: this.props.value});
  }

  componentWillReceiveProps (nextProps) {
    this.setState({value: nextProps.value});
  }

  updateValue (value) {
    if (value <= this.props.max && value >= this.props.min) {
      if (this.props.onChange) {
        this.props.onChange(value, this.props.id);
      }
      else {
        this.setState({value: value});
      }
    }
  }

  decrementValue () {
    let value = this.state.value - this.props.step;
    this.updateValue(value);
  }

  incrementValue () {
    let value = this.state.value + this.props.step;
    this.updateValue(value);
  }


  doDecrement () {
    if (this.state.value - this.props.step < this.props.min) {
      this.setState({value: this.props.min});
      this.stopSpin();
    }
    else {
      this.setState({value: this.state.value - this.props.step});
    }
  }

  doIncrement () {
    if (this.state.value + this.props.step > this.props.max) {
      this.setState({value: this.props.max});
      this.stopSpin();
    }
    else {
      this.setState({value: this.state.value + this.props.step});
    }
  }

  upTimeoutCB () {
    this.spinTimer = setInterval(this._upIntervalCB, this.props.stepIntervalDelay);
  }

  upIntervalCB () {
    this.doIncrement();
  }

  downTimeoutCB () {
    this.spinTimer = setInterval(this._downIntervalCB, this.props.stepIntervalDelay);
  }

  downIntervalCB () {
    this.doDecrement();
  }

  startDownSpin (event) {
    this.clearTimers();

    if (this.state.value - this.props.step >= this.props.min) {
      this.setState({value: this.state.value - this.props.step});

      if (this.props.startSpinDelay > 0)
      {
        this.delayTimeout = setTimeout(this._downTimeoutCB, this.props.startSpinDelay);
      }
    }
    event.preventDefault();
    document.addEventListener('mouseup', this.stopSpin);
  }

  startSpin (direction, event) {
    this.clearTimers();
    this.spinning = true;

    if (direction === 'up') {
      if (this.state.value + this.props.step <= this.props.max) {
        this.setState({value: this.state.value + this.props.step});

        if (this.props.startSpinDelay > 0)
        {
          this.delayTimeout = setTimeout(this._upTimeoutCB, this.props.startSpinDelay);
        }
      }
      this.refs.upButton.focus();
    }
    else if (direction === 'down') {
      if (this.state.value - this.props.step >= this.props.min) {
        this.setState({value: this.state.value - this.props.step});

        if (this.props.startSpinDelay > 0)
        {
          this.delayTimeout = setTimeout(this._downTimeoutCB, this.props.startSpinDelay);
        }
      }
      this.refs.downButton.focus();
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    document.addEventListener('mouseup', this._stopSpin);
  }

  clearTimers () {
    clearTimeout(this.delayTimeout);
    clearInterval(this.spinTimer);
  }

  stopSpin () {
    this.spinning = false;
    this.clearTimers();
    if (this.props.onChange) {
      this.props.onChange(this.state.value, this.props.id);
    }
    document.removeEventListener('mouseup', this._stopSpin);
  }

  handleKeyUp() {
    this.stopSpin();
  }

  handleKeyDown(direction, event) {
    if (!this.spinning && event.keyCode === 32) {
      this.startSpin(direction);
    }
  }

  render() {
    return (
      <div className="touch-spin input-group">
        <span className="input-group-btn">
          <button className="btn btn-default "
                  type="button"
                  ref="downButton"
                  onKeyDown={this.handleKeyDown.bind(this, 'down')}
                  onKeyUp={this.handleKeyUp.bind(this)}
                  onMouseDown={this.startSpin.bind(this, 'down')}>-</button>
        </span>
        <input type="text" value={this.state.value} className="form-control" readOnly="true"/>
        <span className="input-group-btn">
          <button className="btn btn-default"
                  type="button"
                  ref="upButton"
                  onKeyDown={this.handleKeyDown.bind(this, 'up')}
                  onKeyUp={this.handleKeyUp.bind(this)}
                  onMouseDown={this.startSpin.bind(this, 'up')}>+</button>
        </span>
      </div>
    );
  }
}

Touchspin.propTypes = {
  id: React.PropTypes.string,
  max: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
  startSpinDelay: React.PropTypes.number,
  step: React.PropTypes.number,
  stepIntervalDelay: React.PropTypes.number,
  value: React.PropTypes.number.isRequired
};

Touchspin.defaultProps = {
  max: 1000,
  min: 0,
  step: 1,
  startSpinDelay: 500,
  stepIntervalDelay: 100,
  value: 0
};

