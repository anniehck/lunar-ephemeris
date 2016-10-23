import React from 'react';

const ReviewForm = props => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <h2>New Review Form</h2>
      <div className="field">
      <label>Title</label><br />
      <input
        type="text"
        value={props.title}
        name='title'
        onChange={props.handleChange}
      /></div>

      <div className="field">
      <label>Body</label><br />
      <textarea
        value={props.body}
        name='body'
        onChange={props.handleChange}
      /></div>

      <div className="field">
        <label>Rating</label><br />
        <select
          name='rating'
          value={props.rating}
          onChange={props.handleSelect}
          className="rating">
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
      </div>

      <div className="submit">
        <input type="submit" value="Submit" />
      </div>
      </form>
  );
};

export default ReviewForm;
