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

    console.log(selectedUser);

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
                                        required
                                        value={user.uname}
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
                                        required
                                    />
                                </div>
                            </div>
                            <div className={`${styled.edit}`}>
                                <div className={styled.edit__InputBox}>
                                    <p>자기 소개</p>
                                    <textarea
                                        row="3"
                                        className={`${styled.edit__Input} ${styled.edit__textarea}`}
                                        spellCheck="false"
                                        type="text"
                                        maxLength={100}
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
                                        required
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