import React from 'react';

const LocationForm = props => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <h2>Location Form</h2>
      <label>City</label><br />
      <input
        type="text"
        placeholder="city"
        value={props.city}
        onChange={props.handleCity}
      /><br />

      <label>State</label><br />
      <input
        type="text"
        placeholder="state"
        value={props.state}
        onChange={props.handleState}
      /><br />

      <label>Zip code</label><br />
      <input
        type="text"
        placeholder="zip"
        value={props.zip}
        onChange={props.handleZip}
      /><br />

        <input type="submit" value="Check Location" />
      </form>
  );
};

export default LocationForm;
