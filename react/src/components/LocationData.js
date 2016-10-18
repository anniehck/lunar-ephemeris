import React from 'react';

const LocationData = props => {
  return (
    <li key={props.id}>
      {props.name} <br />
      {props.dateTimeISO}
    </li>
  );
}

export default LocationData;
