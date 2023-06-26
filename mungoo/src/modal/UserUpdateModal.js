import Modal from '@mui/material/Modal';
import React, { useRef, useState } from 'react';
import styled from "../styles/UserUpdateModal.module.css";


const API_URL = process.env.REACT_APP_API_URL;


const UserUpdateModal = ({ open, onClose, handleProfileEdit,handleWithdrawal ,users,selectedUser  }) => {
  
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedBgImage, setSelectedBgImage] = useState(null);
  const [user, setUser] = useState({});

  const inputRef = useRef();

  const handleEditComplete = () => {
    // Add your logic here for handling the completion of the edit
    // For example, you can retrieve the form data and perform necessary actions
  };

  const { email, grade, nickname, password, regDate, uid, uname, uno } = selectedUser;


  console.log(selectedUser);
  console.log('Email:', email);
  console.log('Grade:', grade);
  console.log('Nickname:', nickname);
  console.log('Password:', password);
  console.log('Registration Date:', regDate);
  console.log('UID:', uid);
  console.log('Username:', uname);
  console.log('UNO:', uno);
  
  return (
    <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className={styled.User_container}>
      <form className={styled.User_editForm}>
        <div className={styled.setUserInfo}>
          <div className={styled.editBox}>
            <div className={styled.edit}></div>
            <div className={`${styled.edit}`}>
              <div className={styled.edit__InputBox}>
                <p>이름</p>
                <input
                  maxLength="25"
                  className={styled.edit__Input}
                  ref={inputRef}
                  spellCheck="false"
                  type="text"
                  value={uname}
                />
              </div>
            </div>
            <div className={`${styled.edit}`}>
              <div className={styled.edit__InputBox}>
                <p>닉네임</p>
                <input
                  maxLength="25"
                  className={styled.edit__Input}
                  ref={inputRef}
                  spellCheck="false"
                  type="text"
                  value={nickname}                 
                />
              </div>
            </div>
            <div className={`${styled.edit}`}>
              <div className={styled.edit__InputBox}>
                <p>등급</p>
                <input
                  maxLength="25"
                  className={styled.edit__Input}
                  ref={inputRef}
                  spellCheck="false"
                  type="text"
                  value={grade}                 
                />
              </div>
            </div>
            <div className={`${styled.edit}`}>
              <div className={styled.edit__InputBox}>
                <p>이메일</p>
                <input
                  maxLength="25"
                  className={styled.edit__Input}
                  ref={inputRef}
                  spellCheck="false"
                  type="text"
                  value={email}
                />
              </div>
            </div>
            <div className={styled.UpdatebuttonContainer}>
              <button onClick={handleEditComplete}>수정 완료</button>
              <button className="closeButton" onClick={onClose}>닫기</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </Modal>
  
  );
};

export default UserUpdateModal;
