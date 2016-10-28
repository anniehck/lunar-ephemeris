import React, { Component } from 'react';
import DataFeed from './DataFeed';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      moonData: [],
      latitude: '',
      longitude: '',
      location: '',
      key: '',
      city: '',
      state: '',
      zip: '',
      range: '',
      class: 'hidden'
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
      range: this.state.range };
      debugger;
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    }).done(data => {
      debugger;
      let message = 'Success!';
      this.setState({ flash: message, moonData: data.data, class: 'show' });
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
        <form onSubmit={this.handleCurrentLocation}>
        <div className="radio-field">
        <label>See data for the next:</label><br />
          <div className="radio">
          <label>Day</label>
          <input type="radio" name="range" value="day" onChange={this.handleChange} />
          </div>

          <div className="radio">
          <label>Week</label>
          <input type="radio" name="range" value="week" onChange={this.handleChange} />
          </div>

          <div className="radio">
          <label>Month</label>
          <input type="radio" name="range" value="month" onChange={this.handleChange} />
          </div>
        </div>

        <p>{this.state.flash}</p>

          <div className="submit">
            <input type="submit" value="Use current location!" />
          </div>
        </form>

        <div className={this.state.class}>
          <h2>Moon Data</h2>
          <DataFeed data={this.state.moonData}/>
        </div>
      </div>
    )
  }
}

export default CurrentLocation;
