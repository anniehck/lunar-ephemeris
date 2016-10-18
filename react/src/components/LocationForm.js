import React from 'react';

const LocationForm = props => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <h2>Location Form</h2>
      <div className="field">
      <label>City</label><br />
      <input
        type="text"
        value={props.city}
        onChange={props.handleCity}
      /></div>

      <div className="field">
      <label>State</label><br />
      <input
        type="text"
        value={props.state}
        onChange={props.handleState}
      /></div>

      <div className="field">
      <label>Zip code</label><br />
      <input
        type="text"
        value={props.zip}
        onChange={props.handleZip}
      /></div>

      <div className="field">
      <label>Latitude</label><br />
      <input
        type="text"
        value={props.lat}
        onChange={props.handleLat}
      /></div>

      <div className="field">
      <label>Longitude</label><br />
      <input
        type="text"
        value={props.lon}
        onChange={props.handleLon}
      /></div>

      <div className="submit">
      <input type="submit" value="Check Location" />
      </div>
      </form>
  );
};

export default LocationForm;
