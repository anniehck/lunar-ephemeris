import React, { Component } from 'react';
import CurrentLocationForm from './CurrentLocationForm';
import DataContainer from './DataContainer';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      moonData: [],
      latitude: '',
      longitude: '',
      range: '',
      class: 'hidden',
      flash: '',
      flashClass: ''
    };
    let options = { timeout: 25000, enableHighAccuracy: true };
    navigator.geolocation.watchPosition(this.updateLocation.bind(this), this.locationError.bind(this), options);

    this.handleCurrentLocation = this.handleCurrentLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateLocation(data) {
   this.setState({ latitude: data.coords.latitude, longitude: data.coords.longitude });
 }

   locationError(error) {
    console.log(error);
    this.setState({ error: error.message })
  }

  handleChange(event) {
    let timeRange = event.target.value;
    this.setState({ range: timeRange });
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/locations"
    })
    .done(data => {
      this.setState({ locationData: data })
    });
  }

  handleCurrentLocation(event) {
    event.preventDefault();
    let formData = {
      city: '',
      state: '',
      zip: '',
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      range: this.state.range
    };
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    })
    .success(data => {
      let message;
      let flashType;
      let moonStats;
      if (data.errorMessages === undefined) {
        message = 'Success!';
        flashType = 'flash-notice';
        moonStats = data.data;
      } else {
        message = data.errorMessages;
        this.setState({ flash: message, flashClass: 'flash-alert' })
        return
      }
      this.setState({
        flash: message,
        flashClass: flashType,
        moonData: moonStats,
        class: 'show'
      });
    })
    .error(data => {
      let message;
      let authorization = 'You need to sign in or sign up before continuing.';
      if (data.responseText === authorization) {
        message = authorization;
      } else {
        message = `${data.status}: ${data.statusText}`;
      }
      this.setState({
        flash: message,
        flashClass: 'flash-alert'
      });
    });
  }

  render() {
    let lat = parseFloat(this.state.latitude).toFixed(4);
    let lon = parseFloat(this.state.longitude).toFixed(4);
    let location = this.state.locationData;

    return(
      <div className="current-loc">
        <h2 className="header">Your Current Location</h2>
        <p>{location.city}, {location.state} {location.zip}<br />
        latitude: {lat}, longitude: {lon}
        </p>
        <CurrentLocationForm
         handleCurrentLocation={this.handleCurrentLocation}
         handleChange={this.handleChange}
         range={this.state.range} />

        <p id={this.state.flashClass}>{this.state.flash}</p>

        <DataContainer
          class={this.state.class}
          data={this.state.moonData} />
      </div>
    )
  }
}

export default CurrentLocation;
