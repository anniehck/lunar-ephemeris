import React from 'react';

const Photo = props => {
  return (
    <div className="photo">
      <img src={props.url} width='50%' />
      <div className="hide">
        <p>{props.title}<br />
           {props.description}</p>
      </div>
    </div>
  )
}

export default Photo;
