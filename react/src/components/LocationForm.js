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
        name='city'
        onChange={props.handleChange}
      /></div>

      <div className="field">
      <label>State</label><br />
      <input
        type="text"
        value={props.state}
        name='state'
        onChange={props.handleChange}
      /></div>

      <div className="field">
        <label>State</label><br />
        <select
          name='state'
          value={props.state}
          onChange={props.handleSelect}
          className="states">
          <option value=""></option>
          {
            props.states.map(state => {
              let current = `${state}`;
              let index = props.states.indexOf(current);
              return (
                <option
                  value={current}
                  key={index}>
                  {current}</option>
              );
            })
          }
          </select>
      </div>

      <div className="field">
      <label>Zip code</label><br />
      <input
        type="text"
        value={props.zip}
        name='zip'
        onChange={props.handleChange}
      /></div>

      <div className="submit">
      <input type="submit" value="Check Location" />
      </div>
      </form>
  );
};

export default LocationForm;
