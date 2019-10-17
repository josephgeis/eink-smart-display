import React from "react";
import Axios from "axios";

import { apiKey, coordinates } from "./config";

const Skycons = require("skycons")(window);

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  updateInfo() {
    let data = [];
    Axios.get(`/forecast/${apiKey}/${coordinates}`, {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        exclude: "daily,minutely,alerts,flags"
      },
      crossdomain: true
    }).then(response => {
      console.log(response);
      data.push(response.data.currently);
      data.push(response.data.hourly.data[1]);
      data.push(response.data.hourly.data[5]);
      data.push(response.data.hourly.data[9]);
      data.push(response.data.hourly.data[13]);
    });

    this.setState({ data: data });
  }

  tick() {
    const date = new Date();
    if (date.getMinutes() % 5 === 0) {
      this.updateInfo();
    } else {
      console.info("Not updating.");
    }
  }

  componentDidMount() {
    this.updateInfo();
    this.timerID = setInterval(() => this.tick(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="weather">
        {this.state.data.map((item, i) => {
          return (
            <WeatherForecast data={item} key={i} color={this.props.color} />
          );
        })}
      </div>
    );
  }
}

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.date = new Date(this.props.data.time * 1000);
  }

  getTimeString(dateObj) {
    let hour = dateObj.getHours() % 12;
    if (!hour) {
      hour = 12;
    }
    let minute = dateObj.getMinutes();
    const ampm = dateObj.getHours() > 11 ? "pm" : "am";
    const time = {
      hour: String(hour),
      minute: ("0" + String(minute)).slice(-2),
      ampm: ampm
    };
    return time.hour + ":" + time.minute + " " + time.ampm;
  }

  render() {
    return (
      <div className="weather-col">
        <p className="weather-time">{this.getTimeString(this.date)}</p>
        <canvas className="skycon" ref={this.ref} width="80px" height="80px" />
        <p className="weather-detail">
          <i className="fas fa-thermometer-three-quarters"></i>{" "}
          {Math.round(this.props.data.temperature)}˚
        </p>
        <p className="weather-detail">
          <i
            className={
              "fas " +
              (Math.round(this.props.data.precipProbability * 100) >= 5 ||
              ["rain", "sleet", "snow", "thunderstorm", "hail"].includes(
                this.props.data.icon
              )
                ? "fa-tint"
                : "fa-tint-slash")
            }
          ></i>{" "}
          {Math.round(this.props.data.precipProbability * 100)}%
        </p>
      </div>
    );
  }

  skyconsSetup() {
    this.skycons = new Skycons({ color: this.props.color });
    this.skycons.add(this.ref.current, this.props.data.icon);
    if (
      [
        "rain",
        "sleet",
        "snow",
        "wind",
        "thunderstorm",
        "hail",
        "tornado"
      ].includes(this.props.data.icon)
    ) {
      this.skycons.play();
    }
  }

  componentDidMount() {
    this.skyconsSetup();
  }

  componentDidUpdate() {
    this.skyconsSetup();
  }
}

export default Weather;
