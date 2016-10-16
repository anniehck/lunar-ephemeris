import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randFact: ''
    };
  }

  componentDidMount() {
    $.ajax({
      url: "http://astrocast.herokuapp.com/bites"
    })
    .done(data => {
      let index = Math.floor(Math.random() * data.length);
      this.setState({ randFact: data[index].name })
    });
  }

  render() {
    return(
      <div>
        <h2 className="space-fact">" {this.state.randFact} "</h2>
      </div>
    )
  }
}

export default Home;
