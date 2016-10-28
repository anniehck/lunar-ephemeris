import React, { Component } from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      title: '',
      body: '',
      rating: '',
      user: '',
      flash: '',
      flashClass: '',
      class: 'hidden',
      clicked: false,
      icon: <i className="material-icons">add_circle</i>
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.resetFlash = this.resetFlash.bind(this);
  }

  componentDidMount() {
    this.refreshPage();
    setInterval(this.refreshPage, 5000);
    setInterval(this.resetFlash, 15000);
  }

  resetFlash() {
    if (this.state.flash !== '') {
      this.setState({ flash: '' });
    }
  }

  refreshPage() {
    $.ajax({
      type: 'GET',
      url: 'api/v1/reviews'
    })
    .done(data => {
      if (data.length !== 0) {
        this.setState({ reviews: data.reviews })
      }
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formData = {
      title: this.state.title,
      body: this.state.body,
      rating: this.state.rating };

    $.ajax({
      type: 'POST',
      url: 'api/v1/reviews',
      data: { review: formData }
    }).success(data => {
      let message;
      let flashType;
      if (data.errorMessages === undefined ) {
        message = `Thanks ${data.user}, your review has been submitted!`;
        flashType = 'flash-notice';
      } else {
        message = data.errorMessages;
        flashType = 'flash-alert';
      }
      this.setState({
        user: data.user,
        flash: message,
        flashClass: flashType
      });
      console.log('posted!');
    }).error(data => {
      let message;
      let authorization = 'You need to sign in or sign up before continuing.';
      if (data.responseText === authorization) {
        message = authorization;
      } else {
        message = `${data.status}: ${data.statusText}`;
      }
      this.setState({
        flash: message,
        flashClass: 'flash-alert'
      });
      console.log(data);
    });

    let newReview = {
      id: Date.now(),
      key: Date.now(),
      name: this.state.title,
      description: this.state.body,
      rating: this.state.rating,
      user: this.state.user
    };
    let newReviews = [...this.state.reviews, newReview];
    this.setState({ reviews: newReviews, title: '', body: '', rating: '' });
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

  handleClick(event) {
    if (this.state.clicked) {
      this.setState({
        class: 'hidden',
        clicked: false,
        icon: <i className="material-icons">add_circle</i>
      });
    } else {
      this.setState({
        class: 'show',
        clicked: true,
        icon: <i className="material-icons">remove_circle</i>
      });
    }
  }

  render() {
    return(
      <div className="reviews content">
        <div id="top"></div>
          <div className="review-links">
            <div className="icon-link">
              <i className="material-icons">check</i>
              <a href="#new">New Review</a>
            </div>
            <div className="icon-link">
              {this.state.icon}
              <a onClick={this.handleClick}>All Reviews</a>
            </div>
          </div>

          <div className={this.state.class}>
            <i className="material-icons">chat</i>
            <h2 className="header">Reviews</h2>
            <ReviewList reviews={this.state.reviews} />
          </div>

          <div id="new">
            <i className="material-icons">create</i>
            <h2 className="header">New Review Form</h2>
            <p id={this.state.flashClass}>{this.state.flash}</p>
            <ReviewForm
                handleFormSubmit={this.handleFormSubmit}
                handleChange={this.handleChange}
                handleSelect={this.handleSelect}
                title={this.state.title}
                body={this.state.body}
                rating={this.state.rating}
                />
          </div>

          <div className="icon-link top">
            <i className="material-icons">arrow_upward</i>
            <a href="#top">Back to Top</a>
          </div>
      </div>
    )
  }
}

export default Reviews;
