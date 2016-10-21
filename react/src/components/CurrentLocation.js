import React, { Component } from 'react';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      latitude: '',
      longitude: '',
      location: ''
    };
    let options = { timeout: 25000, enableHighAccuracy: true };
    navigator.geolocation.watchPosition(this.updateLocation.bind(this), this.locationError.bind(this), options);

    this.handleCurrentLocation = this.handleCurrentLocation.bind(this);
  }

  updateLocation(data) {
   this.setState({ latitude: data.coords.latitude, longitude: data.coords.longitude });
  //  let locData = { latitude: data.coords.latitude, longitude: data.coords.longitude };
  //  $.ajax({
  //    type: 'POST',
  //    url: 'api/v1/locations',
  //    data: { location: locData }
  //  }).done(data => {
  //    console.log('posted');
  //  })
 }

 locationError(error) {
  console.log(error);
  this.setState({ error: error })
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
    let location = this.state.locationData;
    let formData = { city: location.city, state: location.state, zip: location.zip, latitude: location.latitude, longitude: location.longitude };
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    }).done(data => {
      let message = 'Success!';
      this.setState({ flash: message });
    });
  }

  render() {
    let lat = this.state.latitude;
    let lon = this.state.longitude;

    let location = this.state.locationData;
    return(
      <div className="current-loc">
        <h2>Your Current Location</h2>
        <p>{location.city}, {location.state} {location.zip}<br />
        latitude: {lat}, longitude: {lon}
        </p>
        <p>{this.state.flash}</p>
        <form onSubmit={this.handleCurrentLocation}>
          <div className="submit">
            <input type="submit" value="Use this location!" />
          </div>
        </form>
      </div>
    )
  }
}

export default CurrentLocation;
