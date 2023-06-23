import Modal from '@mui/material/Modal';
import React from 'react';



const API_URL = process.env.REACT_APP_API_URL;


const UserOutModal = (handleWithdrawal) => {
  

    const handleWithdrawal = () => {
        setConfirmModalOpen(true);
      };
      



  return (
<Modal
  open={confirmModalOpen}
  onClose={() => setConfirmModalOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <div className={styled.confirmModal}>
    <h2>회원 탈퇴</h2>
    <p>정말로 회원 탈퇴하시겠습니까?</p>
    <div className={styled.confirmButtons}>
      <button onClick={() => setConfirmModalOpen(false)}>취소</button>
      <button onClick={performWithdrawal}>탈퇴</button>
    </div>
  </div>
</Modal>

  );
};

export default UserOutModal;
