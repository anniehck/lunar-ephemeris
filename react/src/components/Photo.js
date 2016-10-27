import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
}
const backdropStyle = {
  position: 'fixed',
  zIndex: 'auto',
  top: 0, bottom: 0, left: 0, right: 0,
  backgroundColor: 'rgba(0, 0, 0, .8)'
}

const dialogueStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#777',
  overflowY: 'auto'
}

const imageStyle = {
  width: '750px',
  height: '500px',
  objectFit: 'contain',
  margin: '0 auto'
}

const pStyle = {
  textTransform: 'lowercase',
  fontVariant: 'small-caps',
  color: '#777',
  fontSize: '1.25em'
}

const iconStyle = {
  alignSelf: 'flex-end',
  color: '#C2D6EF',
  fontWeight: 'bold',
  fontSize: '2em',
  margin: '10px'
}

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="photo">
        <img src={this.props.url} onClick={this.openModal} className="thumbnail" />

        <Modal
          show={this.state.showModal} onHide={this.closeModal}
          style={modalStyle}
          backdropStyle={backdropStyle}
          >
          <div style={dialogueStyle} className="dialogue">
            <i className="material-icons" onClick={this.closeModal} style={iconStyle}>close</i>
            <img src={this.props.url} style={imageStyle} />
            <p style={pStyle}>{this.props.title}</p>
          </div>

        </Modal>

      </div>

    )
  }
}


export default Photo;
