import React, { Component } from 'react';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: []
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
    let location = this.state.locationData
    return(
      <div className="location content">
        <p>Your current location is {location.city}, {location.state} {location.zip}<br />
        latitude: {location.latitude}, longitude: {location.longitude}
        </p>

      </div>
    )
  }
}

export default Location;
