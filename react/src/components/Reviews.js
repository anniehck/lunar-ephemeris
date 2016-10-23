import React, { Component } from 'react';
import ReviewForm from './ReviewForm';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      title: '',
      body: '',
      rating: '',
      flash: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'api/v1/reviews'
    })
    .done(data => {
      if (data.length !== 0) {
        debugger;
        this.setState({ reviews: data })
      }
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formData = { title: this.state.title, body: this.state.body, rating: this.state.rating };
    $.ajax({
      type: 'POST',
      url: 'api/v1/reviews',
      data: { review: formData }
    }).success(data => {
      let message = 'Success!';
      this.setState({ flash: message, title: '', body: '', rating: '' });
      console.log('posted!');
    }).error(data => {
      let message = 'Invalid fields';
      this.setState({ flash: message });
      console.log(data);
    });
  }

  handleChange(event) {
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleSelect(event) {
    let userRating = event.target.value;
    this.setState({ rating: userRating });
  }

  render() {
    let flash = $('#flash').text();

    return(
      <div className="reviews content">
        
        <i className="material-icons">create</i>
        <h2>New Review Form</h2>
        <p className="flash">{this.state.flash}</p>
        <ReviewForm
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          title={this.state.title}
          body={this.state.body}
          rating={this.state.rating}
          />
      </div>
    )
  }
}

export default Reviews;
