import React from 'react';
import Review from './Review';

const ReviewList = props => {
  let reviews = props.reviews.map(review => {
    const { id, title, body, rating, user } = review;
    return (
      <Review
        key={id}
        id={id}
        title={title}
        body={body}
        rating={rating}
        user={user}
        />
    );
  });

  return (
    <div className="review-list">
      {reviews}
    </div>
  )
}

export default ReviewList;
