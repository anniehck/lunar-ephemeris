import React, { Component } from 'react';
import PhotoList from '../components/PhotoList';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      query: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: "/api/v1/galleries",
      data: { search: this.state.query }
    })
    .done(data => {
      let galleryPhotos = data.gallery.objects;
      debugger;
      if (galleryPhotos.length !== 0) {
        this.setState({ photos: galleryPhotos })
      } else {
        this.setState({ error: 'Sorry, no results' })
      }
    });
  }

  handleChange(event) {
    event.preventDefault();
    let search = event.target.value;
    this.setState({ query: search });
  }

  render() {
    return(
      <div className="content">
        <div className="search">
          <form onSubmit={this.handleSearch}>
            <input type="text" onChange={this.handleChange} />
            <button type="submit">Search</button>
          </form>
            <p>{this.state.error}</p>
        </div>

        <PhotoList photos={this.state.photos} />
      </div>
    )
  }
}

export default Gallery;
