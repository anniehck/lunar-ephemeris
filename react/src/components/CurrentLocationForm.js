import React from 'react';

const CurrentLocationForm = props => {
  return (
    <form onSubmit={props.handleCurrentLocation}>
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
        <button type="submit">Use current location!</button>
      </div>
    </form>
  );
};

export default CurrentLocationForm;
