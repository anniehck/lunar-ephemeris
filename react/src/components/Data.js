import React from 'react';

const Data = props => {
  return (
    <div className="data">
    <h3>{props.dateTime}</h3>
      <p>
      <strong>Rise:</strong> {props.rise}<br />
      <strong>Set:</strong> {props.set}<br />
      <strong>Transit:</strong> {props.transit}<br />
      <strong>Moonphase:</strong> {props.moonphase}<br />
      <strong>Illumination:</strong> {props.moonIllum}<br />
      <strong>Age:</strong> {props.moonAge}<br />
      <strong>Angle:</strong> {props.moonAngle}<br />
      </p>
    </div>
  )
}

export default Data;
