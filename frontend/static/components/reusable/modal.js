import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  
const modalWrapper = 
<div className="modal">
  <div className="modal-container">
    <div className="modal-title mb-2">
      {props.title}
    </div>
    <hr className="mb-2"></hr>
    {props.children}
    <div className="mt-3">
      <button type="button" className="btn btn-primary float-right"  style={{width: "100px"}} onClick={props.onAcceptModal}>{props.acceptText?props.acceptText:"Accept"}</button>
      <button type="button" className="btn btn-outline-primary float-right mr-3" style={{width: "100px"}} onClick={props.onCancelModal}>{props.cancelText?props.cancelText:"Cancel"}</button>
    </div>
  </div>
</div>

  return ReactDOM.createPortal(
    modalWrapper,
    document.getElementById('modal-root')
  );
}

export default Modal;