import React from 'react';

const Review = props => {
  return (
    <div className="review">
      <h4>{props.title}</h4>
      <p><strong>Rating:</strong> {props.rating}</p>
      <p>{props.body}</p>
      <p>{props.user}</p>
    </div>
  )
}

export default Review;
