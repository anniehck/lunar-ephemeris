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
      zip: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleCity = this.handleCity.bind(this);
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
    let formData = { city: this.state.city, state: this.state.city, zip: this.state.zip };
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    }).success(data => {
      debugger;
      console.log('posted!');
    }).error(data => {
      console.log('FAIL');
    });

    let newLocation = {
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
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


  render() {
    return(
      <div className="location content">
        <CurrentLocation />

        <LocationForm
          handleFormSubmit={this.handleFormSubmit}
          handleCity={this.handleCity}
          handleState={this.handleState}
          handleZip={this.handleZip}
        />
      </div>
    )
  }
}

export default Location;
