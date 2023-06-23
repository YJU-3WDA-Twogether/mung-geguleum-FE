import React from "react";
import '../styles/AgreeModal.css';


const AgreeModal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>약관 동의</h2>
        {/* Add your terms and conditions content here */}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit....</p>
        <button onClick={closeModal}>동의하기</button>
      </div>
    </div>
  );
};

export default AgreeModal;
