import React from 'react';
import ChatBot from './ChatBot'; // Import your ChatBot component
import './Modal.css'; // Import CSS for styling modal

const Modal = ({ show, onClose }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <ChatBot />
      </div>
    </div>
  );
};

export default Modal;
