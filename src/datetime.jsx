import React from "react";

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class DateTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="datetime">
        <Clock date={this.props.date} />
        <Date date={this.props.date} />
      </div>
    );
  }
}

class Clock extends React.Component {
  getTimeStrings() {
    const date = this.props.date;
    let hour = date.getHours() % 12;
    if (!hour) {
      hour = 12;
    }
    let minute = date.getMinutes();
    const ampm = date.getHours() > 11 ? "PM" : "AM";
    return {
      hour: String(hour),
      minute: ("0" + String(minute)).slice(-2),
      ampm: ampm
    };
  }

  render() {
    return (
      <div className="clock">
        {this.getTimeStrings().hour}:{this.getTimeStrings().minute}
        <span className="ampm">{this.getTimeStrings().ampm}</span>
      </div>
    );
  }
}

class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="date">
        {daysOfWeek[this.props.date.getDay()]},{" "}
        {months[this.props.date.getMonth()]} {this.props.date.getDate()},{" "}
        {this.props.date.getFullYear()}
      </div>
    );
  }
}

export default DateTime;
