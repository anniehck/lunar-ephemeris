import React from 'react';
import DataFeed from './DataFeed';

const DataContainer = props => {
  let emptyFeed = [];
  if (props.data.length > 0) {
    return (
      <div className={props.class}>
        <div className="moondata">
          <i className="material-icons">brightness_3</i>
          <h2 className="header">Moon Stats</h2>
          <DataFeed data={props.data}/>
          <div className="icon-link top">
            <i className="material-icons">arrow_upward</i>
            <a href="#top">Back to Top</a>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={props.class}>
        <div className="moondata">
          <i className="material-icons">brightness_3</i>
          <h2 className="header">Moon Stats</h2>
          <DataFeed data={emptyFeed}/>
          <div className="icon-link top">
            <i className="material-icons">arrow_upward</i>
            <a href="#top">Back to Top</a>
          </div>
        </div>
      </div>
    )
  }

}

export default DataContainer;
