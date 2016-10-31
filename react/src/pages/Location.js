import React, { Component } from 'react';
import CurrentLocation from '../components/CurrentLocation';
import LocationForm from '../components/LocationForm';
import DataFeed from '../components/DataFeed';
import { Link } from 'react-router';
import states from '../constants/states';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      city: '',
      state: '',
      zip: '',
      lon: '',
      lat: '',
      range: '',
      flash: '',
      flashClass: '',
      moonData: [],
      formClass: 'hidden',
      dataClass: 'hidden',
      clicked: false,
      dataClicked: false,
      icon: 'edit_location',
      iconClass: 'material-icons grey'
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleData = this.handleData.bind(this);
    this.resetFlash = this.resetFlash.bind(this);
    this.resetIcon = this.resetIcon.bind(this);
  }

  componentDidMount() {
    setInterval(this.resetFlash, 15000);
    setInterval(this.resetIcon, 15000);
  }

  resetFlash() {
    if (this.state.flash !== '') {
      this.setState({ flash: '' });
    }
  }

  resetIcon() {
    if (this.state.iconClass !== 'material-icons grey') {
      this.setState({ iconClass: 'material-icons grey'});
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formData = {
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      latitude: this.state.lat,
      longitude: this.state.lon,
      range: this.state.range
    };
    $.ajax({
      type: 'POST',
      url: 'api/v1/locations',
      data: { location: formData }
    })
    .success(data => {
      let message;
      let flashType;
      let moonStats;
      if (data.errorMessages === undefined) {
        message = 'Sucess! Go check your moon stats';
        flashType = 'flash-notice';
        moonStats = data.data;
        this.state.city = ''
        this.state.state = ''
        this.state.zip = ''
      } else {
        message = data.errorMessages;
        flashType = 'flash-alert';
        this.setState({ flash: message, flashClass: 'flash-alert' })
        return
      }
      this.setState({
        flash: message,
        flashClass: flashType,
        moonData: moonStats,
        iconClass: 'material-icons bright'
      });
    })
    .error(data => {
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
    });
  }

  handleChange(event) {
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleSelect(event) {
    let chosenState = event.target.value;
    this.setState({ state: chosenState });
  }

  handleClick(event) {
    if (this.state.clicked) {
      this.setState({
        formClass: 'hidden',
        clicked: false,
        icon: 'edit_location'
      });
    } else {
      this.setState({
        formClass: 'show',
        clicked: true,
        icon: 'person_pin_circle'
      });
    }
  }

  handleData(event) {
    if (this.state.dataClicked) {
      this.setState({
        dataClass: 'hidden',
        dataClicked: false,
        icon: 'edit_location'
      });
    } else {
      this.setState({
        dataClass: 'show',
        dataClicked: true,
        icon: 'brightness_3'
      });
    }
  }

  render() {
    return(
      <div className="location content">
      <div id="top"></div>
        <div className="icon-menu">
          <div className="icon-link">
            <i className="material-icons">edit_location</i>
            <a href="#new">New</a>
          </div>
          <div className="icon-link">
            <i className={this.state.iconClass}>brightness_3</i>
            <a onClick={this.handleData}>Moon Stats</a>
          </div>
          <div className="icon-link">
            <i className="material-icons">person_pin_circle</i>
            <a name="current" onClick={this.handleClick}>Current</a>
          </div>

        </div>

        <div className={this.state.dataClass}>
          <div className="moon-data">
            <i className="material-icons">brightness_3</i>
            <h2 className="header">Moon Stats</h2>
            <DataFeed data={this.state.moonData}/>

            <div className="icon-link top">
              <i className="material-icons">arrow_upward</i>
              <a href="#top">Back to Top</a>
            </div>
          </div>
        </div>


        <i className="material-icons">{this.state.icon}</i>

        <div className={this.state.formClass}>
          <CurrentLocation />
        </div>

        <a id="new"></a>
        <div className="new-loc">
          <h2 className="header">New Location Form</h2>
          <p id={this.state.flashClass}>{this.state.flash}</p>

          <LocationForm
            handleFormSubmit={this.handleFormSubmit}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
            lat={this.state.lat}
            lon={this.state.lon}
            range={this.state.range}
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            states={states}
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

export default Location;
