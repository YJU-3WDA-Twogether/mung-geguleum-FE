import Modal from '@mui/material/Modal';
import React from 'react';
import styled from "../styles/UpdateProfileModal.module.css";

const ProfileEditModal = ({ open, onClose, handleProfileEdit }) => {
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
            <div className={styled.close}>
              {/* <GrClose /> */}
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
                  {/* {editAttachmentBg !== bgImg ? (
                    <div className={styled.image__icon}>
                      <IoCameraReverseOutline />
                    </div>
                  ) : (
                    <div className={styled.image__icon}>
                      <IoCameraOutline />
                    </div>
                  )} */}
                </label>
                {/* {editAttachmentBg !== bgImg && (
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
              {/* <div className={styled.bgImageBox}>
                <img src={editAttachmentBg} alt="배경화면 이미지" />
              </div> */}
            </div>
            <div className={styled.editBox}>
              <div className={styled.edit}>
                <div className={styled.profile__image}>
                  <div className={styled.image__iconBox}>
                    <label htmlFor="attach-file">
                      {/* {editAttachment !== noneProfile ? (
                        <div className={styled.image__icon}>
                          <IoCameraReverseOutline />
                        </div>
                      ) : (
                        <div className={styled.image__icon}>
                          <IoCameraOutline />
                        </div>
                      )} */}
                    </label>
                    {/* {editAttachment !== noneProfile && (
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
                  {/* <img src={editAttachment} alt="프로필 이미지" /> */}
                </div>
              </div>
              <div className={`${styled.edit}`}>
                <div className={styled.edit__InputBox}>
                  <p>이름</p>
                  <input
                    maxLength="25"
                    className={styled.edit__Input}
                    // ref={inputRef}
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
