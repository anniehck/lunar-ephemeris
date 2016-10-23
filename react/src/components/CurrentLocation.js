import React, { Component } from 'react';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      latitude: '',
      longitude: '',
      location: '',
      key: '',
      city: '',
      state: '',
      zip: ''
    };
    let options = { timeout: 25000, enableHighAccuracy: true };
    navigator.geolocation.watchPosition(this.updateLocation.bind(this), this.locationError.bind(this), options);

    this.handleCurrentLocation = this.handleCurrentLocation.bind(this);
  }

  updateLocation(data) {
   this.setState({ latitude: data.coords.latitude, longitude: data.coords.longitude });
 }

   locationError(error) {
    console.log(error);
    this.setState({ error: error.message })
  }

  componentDidMount() {
      $.ajax({
        method: 'GET',
        url: "/api/v1/locations"
      })
      .done(data => {
        this.setState({ locationData: data })
      });

      // $.ajax({
      //   method: 'GET',
      //   url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${this.state.key}`
      // })
      // .done(data => {
      //   debugger;
      //   if (data.results.length !== 0) {
      //     let cityName = data.results[0].address_components[2].long_name;
      //     this.setState({ city: cityName });
      //   }
      // });

  }

  handleCurrentLocation(event) {
    event.preventDefault();
    let location = this.state.locationData;
    let formData = { city: '', state: '', zip: '', latitude: this.state.latitude, longitude: this.state.longitude };
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
    let lat = parseFloat(this.state.latitude).toFixed(4);
    let lon = parseFloat(this.state.longitude).toFixed(4);
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
