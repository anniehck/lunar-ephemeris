import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randFact: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/facts"
    })
    .done(data => {
      this.setState({ randFact: data.fact.name })
    });
  }

  render() {
    return(
      <div>
        <h2 className="space-fact">"  "</h2>
      </div>
    )
  }
}

export default Home;
