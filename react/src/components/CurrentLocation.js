import React, { Component } from 'react';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
    };
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

  render() {
    let location = this.state.locationData;
    return(
        <p>Your current location is {location.city}, {location.state} {location.zip}<br />
        latitude: {location.latitude}, longitude: {location.longitude}
        </p>
    )
  }
}

export default CurrentLocation;
