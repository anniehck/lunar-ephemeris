import React from 'react';
import Data from './Data';

const DataFeed = props => {
    let data = props.data.map(date => {
      let day = new Date(date.dateTimeISO).toString().substr(0, 15);
      let riseTime = new Date(date.moon.riseISO).toString().substr(16).slice(0, 5);
      let setTime = new Date(date.moon.setISO).toString().substr(16).slice(0, 5);
      let transitTime = new Date(date.moon.transitISO).toString().substr(16).slice(0, 5);
      return (
        <Data
          key={date.timestamp}
          id={date.timestamp}
          dateTime={day}
          rise={riseTime}
          set={setTime}
          transit={transitTime}
          moonphase={date.moon.phase.name}
          moonIllum={date.moon.phase.illum}
          moonAge={date.moon.phase.age}
          moonAngle={date.moon.phase.angle}
          />
      );
    });

    let header;
    if (data.length !== 0) {
      header = `@${props.data[0].place.name}`;
    } else {
      header = 'Submit a Location to see moon data!';
    }

  return (
    <div>
    <h3>{header}</h3>
      <div className="data-list">
        {data}
      </div>
    </div>
  )
}

export default DataFeed;
