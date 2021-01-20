import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "../reusable/modal";
import Avatar from 'react-avatar-edit';
import {displayErrorMessage} from "../../scripts/display_messages";

class AvatarEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCroped: this.props.userAvatar,
      imageDisplay: this.props.userAvatar
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
    //this img would be the croped image
    this.setState({imageCroped: img});
  }
  
  onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 200000){
      displayErrorMessage("image is too large");
      elem.target.value = "";
    };
  }

  onFileLoad(img) {
    this.setState({imageDisplay: img});
  }

  onAcceptAvatar(img){
    if (!img){
      displayErrorMessage("image cannot be empty");
      return;
    }
    this.props.onAcceptAvatar(img);
  }
  
  render () {
    return (
      <div>
        <Modal title="Profile"
               acceptText="Apply"
               onAcceptModal={()=>this.onAcceptAvatar(this.state.imageCroped)}
               onCancelModal={this.props.onCancelAvatar}
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