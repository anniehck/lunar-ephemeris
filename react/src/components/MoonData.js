import React, { Component } from 'react';
import DataFeed from './DataFeed';

class MoonData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moonData: []
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/api/v1/datas'
    })
    .done(data => {
      debugger;
      this.setState({ moonData: data.data });
    })
  }

  render() {
    return (
      <div className="moon-data">
      <h2>Moon Data (+4 weeks)</h2>
      <DataFeed data={this.state.moonData} />
      </div>
    )
  }
}

export default MoonData;
