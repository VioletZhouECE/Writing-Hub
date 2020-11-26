import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  
const modalWrapper = 
<div className="modal">
  <div className="modal-content">
    <header className="modal-header">
      <h1>{props.title}</h1>
    </header>
    {props.children}
    <button type="button" className="btn-primary float-right"  style={{width: "200px"}} onClick={props.acceptModal}>Accept</button>
    <button type="button" className="btn-primary float-right" style={{width: "200px"}} onClick={props.cancelModal}>Cancel</button>
  </div>
</div>

  return ReactDOM.createPortal(
    modalWrapper,
    document.getElementById('modal-root')
  );
}

export default Modal;