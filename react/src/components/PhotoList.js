import React from 'react';
import Photo from './Photo';


const PhotoList = props => {
  let photos = props.photos.map(photo => {
    const { id, title, description, url_hd } = photo;
    return (
      <Photo
        key={id}
        id={id}
        title={title}
        description={description}
        url={url_hd}
        />
    );
  });

  return (
    <div className="photo-list modal-open">
      {photos}
    </div>
  )
}

export default PhotoList;
