import React, { Component } from 'react';

class MoonStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moon: [],
      city: '',
      date: '',
      moonPhase: '',
      illum: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/stats"
    })
    .done(data => {
      if (data.moon.length !== 0) {
        this.setState({ city: data.city, date: data.date, moon: data.moon, moonPhase: data.moon.phase.name, illum: data.moon.phase.illum })
      }
    });
  }

  render() {
    let moonStats = this.state.moon;
    let date = new Date(this.state.date).toString().substr(0, 15);
    let riseTime = '?';
    let setTime = '?';
    if (moonStats.riseISO !== null) {
      riseTime = new Date(moonStats.riseISO).toString().substr(16).slice(0, 5);
    }
    if (moonStats.setISO !== null) {
      setTime = new Date(moonStats.setISO).toString().substr(16).slice(0, 5);
    }

    return(
      <div className="moon-stats content">
        <i className="material-icons">brightness_2</i>
        <h3>The Moon in {this.state.city} Tonight</h3>
        <p>{date}</p>
        <p>The moon rises at {riseTime} and sets at {setTime}</p>
        <p className="phase">{this.state.moonPhase}</p>
        <p>illumination at <span className="blue">{this.state.illum}</span></p>
      </div>
    )
  }
}

export default MoonStats;
