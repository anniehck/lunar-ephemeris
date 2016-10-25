import React, { Component } from 'react';
import CurrentLocation from '../components/CurrentLocation';
import LocationForm from '../components/LocationForm';
import { Link } from 'react-router';
import states from '../constants/states';

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
      flash: '',
      flashClass: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formData = {
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      latitude: this.state.lat,
      longitude: this.state.lon };

    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    }).success(data => {
      let message;
      let flashType;
      if (data.errorMessages === undefined ) {
        message = data.error;
        flashType = 'flash-notice';
        this.state.city = ''
        this.state.state = ''
        this.state.zip = ''
      } else {
        message = data.errorMessages;
        flashType = 'flash-alert';
      }
      this.setState({
        flash: message,
        flashClass: flashType
      });
    }).error(data => {
      debugger;
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
    return(
      <div className="location content">
        <i className="material-icons">location_on</i>
        <CurrentLocation />

        <h2>New Location Form</h2>
        <p id={this.state.flashClass}>{this.state.flash}</p>

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

export default Location;
