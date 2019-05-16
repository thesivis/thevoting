import React, { Component } from "react";

class CheckBoxField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      checked: event.target.checked
    });
  }

  getFieldValue = () => {
    return this.state.checked;
  };

  render() {
    return (
      <input
        type="checkbox"
        {...this.props}
        checked={this.state.checked}
        onChange={this.handleChange}
      />
    );
  }
}

export default CheckBoxField;
