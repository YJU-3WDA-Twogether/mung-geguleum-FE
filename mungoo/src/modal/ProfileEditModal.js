import Modal from '@mui/material/Modal';
import React, { useRef } from 'react';
import { GrClose } from "react-icons/gr";
import {
  IoCameraOutline,
  IoCameraReverseOutline
} from "react-icons/io5";
import pfile from "../image/Profile.jpg";
import bgfile from "../image/background.jpg";
import styled from "../styles/UpdateProfileModal.module.css";
const ProfileEditModal = ({ open, onClose, handleProfileEdit }) => {

  const inputRef = useRef();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styled.container}>
        <form className={styled.editForm}>
          <div className={styled.topBox}>
            <div className={styled.close} onClick={onClose}>
              <GrClose />
            </div>
            <div className={styled.submit}>
              <input
                type="submit"
                value="프로필 수정"
                className={styled.editInput__arrow}
                // disabled={!isAddFile && !isDeleteProfileURL && !isDeleteBgURL}
              />
            </div>
          </div>
          <div className={styled.setUserInfo}>
            <div className={styled.backImage}>
              <div className={styled.image__iconBox}>
                <label htmlFor="attach-bgfile">
                  {bgfile ? (
                    <div className={styled.image__icon}>
                      <IoCameraReverseOutline />
                    </div>
                  ) : (
                    <div className={styled.image__icon}>
                      <IoCameraOutline />
                    </div>
                  )}
                </label>
                {/* 이미지가 있을경우 X */}
                {/* {bgfile && (
                  <div className={styled.image__icon}>
                    <IoCloseSharp />
                  </div>
                )} */}
                <input
                  id="attach-bgfile"
                  type="file"
                  accept="image/*"
                  style={{
                    display: "none",
                  }}
                />
              </div>
              <div className={styled.bgImageBox}>
              <img src={bgfile} alt="배경사진" />
              </div>
            </div>
            <div className={styled.editBox}>
              <div className={styled.edit}>
                <div className={styled.profile__image}>
                  <div className={styled.image__iconBox}>
                    <label htmlFor="attach-file">
                      {pfile ? (
                        <div className={styled.image__icon}>
                          <IoCameraReverseOutline />
                        </div>
                      ) : (
                        <div className={styled.image__icon}>
                          <IoCameraOutline />
                        </div>
                      )}
                    </label>
                    {/* 이미지가 있을경우 X */}
                    {/* {pfile && (
                      <div className={styled.image__icon}>
                        <IoCloseSharp />
                      </div>
                    )} */}
                    <input
                      id="attach-file"
                      type="file"
                      accept="image/*"
                      style={{
                        display: "none",
                      }}
                    />
                  </div>
                  <img src={pfile} alt="프로필 이미지" />
                </div>
              </div>
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
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
