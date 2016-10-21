import React, { Component } from 'react';

class MoonStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      moon: [],
      name: '',
      illum: '',
      lat: '',
      lon: ''
    };
    // let options = { timeout: 25000, enableHighAccuracy: true };
    // navigator.geolocation.watchPosition(this.updateLocation.bind(this), this.locationError.bind(this), options);
  }

  // updateLocation(data) {
  //   this.setState({ lat: data.coords.lat, lon: data.coords.lon });
  //   let locationData = { latitude: this.state.lat, longitude: this.state.lon };
  //   $.ajax({
  //     type: 'POST',
  //     url: 'api/v1/stats',
  //     data: { location: locationData }
  //   }).done(data => {
  //     debugger;
  //     let message = 'Success!';
  //     this.setState({ flash: message });
  //     });
  // }
  //
  // locationError(error) {
  //   alert(error.message);
  // }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/stats"
    })
    .done(data => {
      if (data.moon.length !== 0) {
        this.setState({ city: data.city, moon: data.moon, name: data.moon.phase.name, illum: data.moon.phase.illum })
      }
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
