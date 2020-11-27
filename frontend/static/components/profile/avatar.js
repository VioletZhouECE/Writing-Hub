import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "../reusable/modal";
import Avatar from 'react-avatar-edit';

class AvatarEdit extends React.Component {
  constructor(props) {
    super(props);
    const src = '/static/image/carousel-sunshine.jpg'
    this.state = {
      imageCroped: src,
      imageDisplay: src
    }

    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }
  
  onClose() {
    this.setState({imageCroped: null,
                   imageDisplay: null});
  }

  onCrop(img) {
    this.setState({imageCroped: img});
  }
  
  onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  onFileLoad(img) {
    this.setState({imageDisplay: img});
  }
  
  render () {
    return (
      <div>
        <Modal title="Profile"
               acceptText="Apply"
        >
          <Avatar
            width={468}
            imageWidth={468}
            height={300}
            onCrop={this.onCrop}
            onClose={this.onClose}
            onBeforeFileLoad={this.onBeforeFileLoad}
            src={this.state.imageDisplay}
          />
        </Modal>
      </div> 
    )
  }
}

export default AvatarEdit;