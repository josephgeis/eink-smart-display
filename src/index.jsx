import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import DateTime from "./datetime.jsx";
import Weather from "./weather.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      date: date,
      className: this.getClassName(date),
      weatherColor: this.getWeatherColor(date)
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getClassName(date) {
    const hour = date.getHours();
    if (7 < hour && hour < 19) {
      return "main";
    } else {
      return "main dark";
    }
  }

  getWeatherColor(date) {
    const hour = date.getHours();
    if (7 < hour && hour < 19) {
      return "black";
    } else {
      return "white";
    }
  }

  tick() {
    const date = new Date();
    this.setState({
      date: date,
      className: this.getClassName(date),
      weatherColor: this.getWeatherColor(date)
    });
  }

  render() {
    return (
      <div className={this.state.className}>
        <DateTime date={this.state.date} />
        <Weather color={this.state.weatherColor} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"), null);
