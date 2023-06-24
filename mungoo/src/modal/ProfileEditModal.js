import axios from 'axios';
import Modal from '@mui/material/Modal';
import React, { useRef, useState } from 'react';
import { GrClose } from "react-icons/gr";
import { IoCameraOutline, IoCameraReverseOutline, IoCloseSharp } from "react-icons/io5";
import pfile from "../image/Profile.jpg";
import bgfile from "../image/background.jpg";
import styled from "../styles/UpdateProfileModal.module.css";
import jwt from "jwt-decode";


const API_URL = process.env.REACT_APP_API_URL;


const ProfileEditModal = ({ open, onClose, handleProfileEdit, handleWithdrawal }) => {

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedBgImage, setSelectedBgImage] = useState(null);
  const [introduce, setIntroduce] = useState(""); // 자기 소개 상태값 추가
  const [nickname, setNickname] = useState(""); // 닉네임 상태값 추가
  const { uno, uid } = jwt(localStorage.getItem('accessToken'));

  const inputRef = useRef();

  const handleProfileImageChange = (e) => {
    setSelectedProfileImage(e.target.files[0]);
  };

  const handleBgImageChange = (e) => {
    setSelectedBgImage(e.target.files[0]);
  };

  const onDeleteProfileClick = async () => {
    const ok = window.confirm("프로필사진을 삭제하시겠어요?");

    if (ok) {
      setSelectedProfileImage(pfile);
    }
  };

  const onDeleteBgClick = async () => {
    const ok = window.confirm("배경사진을 삭제하시겠어요?");

    if (ok) {
      setSelectedBgImage(bgfile);
    }
  };

  const update = async () => {
    const formData = new FormData();
    formData.append('main', selectedProfileImage);
    formData.append('back', selectedBgImage);
    formData.append('introduce', introduce); // 자기 소개 값을 추가
    formData.append('nickname', nickname); // 닉네임 값을 추가

    try {
      const response = await axios.put(`${API_URL}/user/userUpdate`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Update response:', response.data);
      handleProfileEdit(response.data); // 프로필 수정 완료 후 처리할 작업 호출
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
      <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <div className={styled.container}>
          <form className={styled.editForm} onSubmit={update}>
            <div className={styled.topBox}>
              <div className={styled.close} onClick={onClose}>
                <GrClose />
              </div>
              <div className={styled.submit}>
                <input
                    type="submit"
                    value="프로필 수정"
                    className={styled.editInput__arrow}
                />
              </div>
            </div>
            <div className={styled.setUserInfo}>
              <div className={styled.backImage}>
                <div className={styled.image__iconBox}>
                  <label htmlFor="attach-bgfile">
                    {selectedBgImage !== bgfile ? (
                        <div className={styled.image__icons}>
                          <div className={styled.image__icon}>
                            <IoCameraReverseOutline />
                          </div>
                        </div>
                    ) : (
                        <div className={styled.image__icon}>
                          <IoCameraOutline />
                        </div>
                    )}
                  </label>
                  {selectedBgImage && selectedBgImage !== bgfile && (
                      <div className={styled.image__icon} onClick={onDeleteBgClick}>
                        <IoCloseSharp />
                      </div>
                  )}
                  <input
                      id="attach-bgfile"
                      type="file"
                      accept="image/*"
                      style={{
                        display: "none",
                      }}
                      onChange={handleBgImageChange}
                  />
                </div>
                <div className={styled.bgImageBox}>
                  {selectedBgImage && selectedBgImage !== bgfile ? (
                      <img
                          src={URL.createObjectURL(selectedBgImage)}
                          alt="배경사진"
                      />
                  ) : (
                      <img src={bgfile} alt="배경사진" />
                  )}
                </div>
              </div>
              <div className={styled.editBox}>
                <div className={styled.edit}>
                  <div className={styled.profile__image}>
                    <div className={styled.image__iconBox}>
                      <label htmlFor="attach-file">
                        {selectedProfileImage !== pfile ? (
                            <div className={styled.image__icons}>
                              <div className={styled.image__icon}>
                                <IoCameraReverseOutline />
                              </div>
                            </div>
                        ) : (
                            <div className={styled.image__icon}>
                              <IoCameraOutline />
                            </div>
                        )}
                      </label>
                      {selectedProfileImage && selectedProfileImage !== pfile && (
                          <div className={styled.image__icon} onClick={onDeleteProfileClick}>
                            <IoCloseSharp />
                          </div>
                      )}
                      <input
                          id="attach-file"
                          type="file"
                          accept="image/*"
                          style={{
                            display: "none",
                          }}
                          onChange={handleProfileImageChange}
                      />
                    </div>
                    {selectedProfileImage && selectedProfileImage !== pfile ? (
                        <img
                            src={URL.createObjectURL(selectedProfileImage)}
                            alt='프로필 이미지'
                        />
                    ) : (
                        <img src={pfile} alt='프로필 이미지' />
                    )}
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
                        onChange={(e) => setNickname(e.target.value)} // 닉네임 변경 시 상태값 업데이트
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
                        value={introduce}
                        onChange={(e) => setIntroduce(e.target.value)} // 자기 소개 변경 시 상태값 업데이트
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
  );
};

export default ProfileEditModal;
