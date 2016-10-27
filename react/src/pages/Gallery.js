import React, { Component } from 'react';
import PhotoList from '../components/PhotoList';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "/api/v1/galleries"
    })
    .done(data => {
      this.setState({ photos: data.gallery.objects })
    });
  }

  handleSearch() {
    
  }

  render() {
    return(
      <div className="content">
        <PhotoList photos={this.state.photos} />
      </div>
    )
  }
}

export default Gallery;
