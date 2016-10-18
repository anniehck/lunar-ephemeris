import React, { Component } from 'react';
import { Link } from 'react-router';
import LocationData from './LocationData'

class LocationStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/stats"
    })
    .done(data => {
      debugger;
      this.setState({ data: data.data })
    });
  }

  render() {
    let data = this.state.data;
    if (data.length !== 0) {
    data.map(data => {
      return (
      <LocationData
        key={data.id}
        id={data.id}
        name={data.name}
        dateTimeISO={data.dateTimeISO}
        />
      );
    });
  }

    // let nextFull;
    // for (var i = 0; i > data.length; i++) {
    //   if (data.name === 'full moon') {
    //     nextFull = data[i];
    //   }
    //   return nextFull;
    // }
    // debugger;


    return(
      <div>
        <ul>
        {data}
        </ul>

      </div>
    )
  }
}

export default LocationStats;
