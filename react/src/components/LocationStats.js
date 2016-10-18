import React, { Component } from 'react';
import { Link } from 'react-router';

class LocationStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/stats"
    })
    .done(data => {
      debugger;
      this.setState({ data: data.data.name })
    });
  }

  render() {
    let data = this.state.data;

    return(
      <div>
        {this.state.data}
      </div>
    )
  }
}

export default LocationStats;
