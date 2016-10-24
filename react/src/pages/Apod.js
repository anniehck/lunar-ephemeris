import React, { Component } from 'react';
import { Link } from 'react-router';

class Apod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      title: '',
      explanation: '',
      copyright: '',
      url: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/apods"
    })
    .done(data => {
      this.setState({
        date: data.apod.date,
        title: data.apod.title,
        explanation: data.apod.explanation,
        copyright: data.apod.copyright,
        url: data.apod.url
      });
    });
  }

  render() {
    return(
      <div className="apod">
      <h3 className="nasa-title">NASA Astronomy Picture of the Day</h3>
        <h2 className="space-fact">{this.state.title}</h2>
        <img src={this.state.url} className="apod" />
        <p>{this.state.explanation}</p>
        <p className="footer">
        {this.state.date}<br />{this.state.copyright}</p>
      </div>
    )
  }
}

export default Apod;
