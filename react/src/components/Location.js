import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import LocationForm from './LocationForm';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      city: '',
      state: '',
      zip: '',
      lon: '',
      lat: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleLon = this.handleLon.bind(this);
    this.handleLat = this.handleLat.bind(this);
  }

  // componentDidMount() {
  //   $.ajax({
  //     method: 'GET',
  //     url: "/api/v1/locations"
  //   })
  //   .done(data => {
  //     this.setState({ locationData: data })
  //   });
  // }

  handleFormSubmit(event) {
    debugger;
    let formData = { city: this.state.city, state: this.state.state, zip: this.state.zip, latitude: this.state.lat, longitude: this.state.lon };
    debugger;
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    }).success(data => {
      debugger;
      console.log('posted!');
    }).error(data => {
      debugger;
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
    return(
      <div className="location content">
        <CurrentLocation />

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
