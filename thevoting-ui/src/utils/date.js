import React, {Component} from 'react';
import DatePicker from "react-datepicker";

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  getFieldValue = () => {
      console.log('field')
      console.log(this.state.startDate);
      return this.state.startDate;
  }

  render() {
    return (
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={this.state.startDate}
        onChange={this.handleChange}
        { ...this.props }
      />
    );
  }
}

export default DateField;



