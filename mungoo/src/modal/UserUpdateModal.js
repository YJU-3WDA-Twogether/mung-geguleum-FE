import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import styled from "../styles/UserUpdateModal.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const UserUpdateModal = ({ open, onClose, handleProfileEdit, handleWithdrawal, users, selectedUser,fetchUsers}) => {
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedBgImage, setSelectedBgImage] = useState(null);
    const [user, setUser] = useState({});

    const unameRef = useRef();
    const nicknameRef = useRef();
    const gradeRef = useRef();
    const emailRef = useRef();
    const introduceRef = useRef();

    const handleEditComplete = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                ...user,
                grade: gradeRef.current.value,
                nickname: nicknameRef.current.value,
                introduce: introduceRef.current.value,
            };

            const response = await axios.put(
                `${API_URL}/user/update/${selectedUser.uno}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            if (response.status === 200) {
                // Update the user's grade and nickname in the selectedUser state
                setUser((prevUser) => ({
                    ...prevUser,
                    grade: updatedUser.grade,
                    nickname: updatedUser.nickname,
                    introduce: updatedUser.introduce
                }));
                // Close the modal
                fetchUsers();
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };


    const { email, grade, nickname, password, regDate, uid, uname, uno, introduce } = selectedUser;

    const handleGradeChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            grade: e.target.value,
        }));
    };

    const handleNicknameChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            nickname: e.target.value,
        }));
    };

    const handleIntroduceChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            introduce: e.target.value,
        }));
    };

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
                                        ref={unameRef}
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
                                        ref={nicknameRef}
                                        spellCheck="false"
                                        type="text"
                                        value={user.nickname || nickname}
                                        onChange={handleNicknameChange}
                                    />
                                </div>
                            </div>
                            <div className={`${styled.edit}`}>
                                <div className={styled.edit__InputBox}>
                                    <p>등급</p>
                                    <select
                                        className={styled.edit__Input}
                                        ref={gradeRef}
                                        value={user.grade || grade}
                                        onChange={handleGradeChange}
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                        <option value="BEN">BEN</option>
                                        <option value="DROP">DROP</option>
                                    </select>
                                </div>
                            </div>
                            <div className={`${styled.edit}`}>
                                <div className={styled.edit__InputBox}>
                                    <p>이메일</p>
                                    <input
                                        maxLength="25"
                                        className={styled.edit__Input}
                                        ref={emailRef}
                                        spellCheck="false"
                                        type="text"
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className={`${styled.edit}`}>
                                <div className={styled.edit__InputBox}>
                                    <p>자기소개</p>
                                    <input
                                        maxLength="25"
                                        className={styled.edit__Input}
                                        ref={introduceRef}
                                        spellCheck="false"
                                        type="text"
                                        value={introduce}
                                        onChange={handleIntroduceChange}
                                    />
                                </div>
                            </div>
                            <div className={styled.UpdatebuttonContainer}>
                                <button  onClick={handleEditComplete}>수정 완료</button>
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