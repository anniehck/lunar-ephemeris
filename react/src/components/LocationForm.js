import React from 'react';

const LocationForm = props => {
  return (
    <form onSubmit={props.handleFormSubmit}>

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


      <div className="radio-field">
      <label>See data for the next:</label><br />
        <div className="buttons">
          <div className="radio">
          <label>Day</label>
          <input type="radio" name="range" value="day" onChange={props.handleChange} />
          </div>

          <div className="radio">
          <label>Week</label>
          <input type="radio" name="range" value="week" onChange={props.handleChange} />
          </div>

          <div className="radio">
          <label>Month</label>
          <input type="radio" name="range" value="month" onChange={props.handleChange} />
          </div>
        </div>
      </div>

      <div className="submit">
      <input type="submit" value="Get Moon Stats" />
      </div>
      </form>
  );
};

export default LocationForm;
