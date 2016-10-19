import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import LocationForm from './LocationForm';
import { Link } from 'react-router';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      city: '',
      state: '',
      zip: '',
      lon: '',
      lat: '',
      flash: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleLon = this.handleLon.bind(this);
    this.handleLat = this.handleLat.bind(this);
  }

  handleFormSubmit(event) {
    let formData = { city: this.state.city, state: this.state.state, zip: this.state.zip, latitude: this.state.lat, longitude: this.state.lon };
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    }).success(data => {
      let message = $('#flash').text();
      this.setState({ flash: message });
      console.log('posted!');
    }).error(data => {
      let message = $('#flash').text();
      this.setState({ flash: message });
      console.log(data);
    });

    let newLocation = {
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      lat: this.state.lat,
      lon: this.state.lon
    }

    this.state.city = ''
    this.state.state = ''
    this.state.zip = ''
    event.preventDefault();
  }

  handleZip(event) {
    let newZip = event.target.value;
    this.setState({ zip: newZip });
  }

  handleCity(event) {
    let newCity = event.target.value;
    this.setState({ city: newCity });
  }

  handleState(event) {
    let newState = event.target.value;
    this.setState({ state: newState });
  }

  handleLat(event) {
    let newLat = event.target.value;
    this.setState({ lat: newLat });
  }

  handleLon(event) {
    let newLon = event.target.value;
    this.setState({ lon: newLon });
  }


  render() {
    let alert = $('#alert').val();
    let notice = $('#notice').val();
    let flash = $('#flash').text();

    return(
      <div className="location content">
        <CurrentLocation />
        <form onSubmit={this.handleFormSubmit}>
          <div className="submit">
            <input type="submit" value="Use this location" />
          </div>
        </form>

        {this.state.flash}

        <LocationForm
          handleFormSubmit={this.handleFormSubmit}
          city={this.state.city}
          state={this.state.state}
          zip={this.state.zip}
          lat={this.state.lat}
          lon={this.state.lon}
          handleCity={this.handleCity}
          handleState={this.handleState}
          handleZip={this.handleZip}
          handleLat={this.handleLat}
          handleLon={this.handleLon}
        />
      </div>
    )
  }
}

export default Location;
