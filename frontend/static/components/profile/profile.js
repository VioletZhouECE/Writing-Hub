import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "../reusable/modal"

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div>
        <Modal title="Profile">
            <p>I am a modal</p>
        </Modal>
      </div> 
    )
  }
}

export default Profile;