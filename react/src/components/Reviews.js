import React, { Component } from 'react';
import { Link } from 'react-router';

class Reviews extends Component {
  debugger;
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleFormSubmit(event) {
    let formData = { city: this.state.city, state: this.state.state, zip: this.state.zip, latitude: this.state.lat, longitude: this.state.lon };
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    }).success(data => {
      let message = 'Success!';
      this.setState({ flash: message });
      console.log('posted!');
    }).error(data => {
      let message = 'Invalid fields';
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

  handleChange(event) {
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleSelect(event) {
    let chosenState = event.target.value;
    this.setState({ state: chosenState });
  }

  render() {
    let flash = $('#flash').text();

    return(
      <div className="location content">
        <i className="material-icons">location_on</i>
        <CurrentLocation />
        <p className="flash">{this.state.flash}</p>

        <LocationForm
          handleFormSubmit={this.handleFormSubmit}
          city={this.state.city}
          state={this.state.state}
          zip={this.state.zip}
          lat={this.state.lat}
          lon={this.state.lon}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          states={states}
        />
      </div>
    )
  }
}

export default Reviews;
