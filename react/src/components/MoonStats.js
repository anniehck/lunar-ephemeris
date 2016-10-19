import React, { Component } from 'react';

class MoonStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      moon: [],
      name: '',
      illum: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/stats"
    })
    .done(data => {
      this.setState({ city: data.city, moon: data.moon, name: data.moon.phase.name, illum: data.moon.phase.illum })
    });
  }

  render() {
    let moonStats = this.state.moon;
    let date = new Date(moonStats.riseISO).toString().substr(0, 15);
    let riseTime = new Date(moonStats.riseISO).toString().substr(16).slice(0, 5);
    let setTime = new Date(moonStats.setISO).toString().substr(16).slice(0, 5);

    return(
      <div className="moon-stats content">
        <i className="material-icons">brightness_2</i>
        <h3>The Moon in {this.state.city} Tonight</h3>
        <p>{date}</p>
        <p>The moon rises at {riseTime} and sets at {setTime}</p>
        <p className="phase">{this.state.name}</p>
        <p>illumination at <span className="blue">{this.state.illum}</span></p>
      </div>
    )
  }
}

export default MoonStats;
