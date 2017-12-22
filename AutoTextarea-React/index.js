import './style.css';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Textarea extends React.Component {

  static defaultProps = {
    className: '',
    showClear: true,
    attributes: null,
    onFocus: () => {},
    onBlur: () => {},
    onInput: () => {}
  }

  static propTypes = {
    className: PropTypes.string,
    showClear: PropTypes.bool,
    attributes: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onInput: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      isFocus: false
    }
  }

  onFocus = () => {
    this.setState({isFocus: true});
    this.props.onFocus(this.state.value)
  }

  onBlur = () => {
    this.setState({isFocus: false});
    this.props.onBlur(this.state.value)
  }

  onInput = e => {// onInput
    const value = e.target.value;
    this.setState({text: value});
    this.props.onInput(value);
  }

  onClear = e => {
    e.stopPropagation();
    this.setState({text: ''});

    const input = e.target.parentNode.querySelector('input,textarea');
    input && input.focus();
    input && input.click();
  }

  render() {
    const {className, showClear, attributes} = this.props,
      {isFocus, text} = this.state,
      showClearElem = showClear && isFocus && !!text,
      config = {
        value: text,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onInput: this.onInput
      };
    attributes && Object.assign(config, attributes);

    return (
      <div className={cn('paui-textarea-auto', {
        [`${className}`]: className,
        focus: showClearElem
      })}>
        <pre>{this.state.text}</pre>
        <textarea {...config}></textarea>
        {showClearElem && (
          <span className="paui-textarea-btn-clear" onClick={this.onClear}/>
        )}
      </div>
    );
  }
}

export default Textarea;
