import axios from 'axios';
import Modal from '@mui/material/Modal';
import React, { useRef, useState ,useEffect} from 'react';
import { GrClose } from "react-icons/gr";
import { IoCameraOutline, IoCameraReverseOutline, IoCloseSharp } from "react-icons/io5";
import pfile from "../image/Profile.jpg";
import bgfile from "../image/background.jpg";
import styled from "../styles/UpdateProfileModal.module.css";
import jwt from "jwt-decode";


const API_URL = process.env.REACT_APP_API_URL;


const ProfileEditModal = ({ open, onClose, handleProfileEdit, handleWithdrawal ,nicknames,imgs,introduces,updates}) => {

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedBgImage, setSelectedBgImage] = useState(null);
  const [introduce, setIntroduce] = useState(introduces);
  const [nickname, setNickname] = useState(nicknames);
  const { uno, uid,role } = jwt(localStorage.getItem('accessToken'));
  const inputRef = useRef();

  useEffect(() => {
    setIntroduce(introduces);
    setNickname(nicknames);
  }, [introduces, nicknames]);

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

  const update = async (e) => {
    e.preventDefault();

    const user = {
      nickname,
      introduce,
      grade: role,
      file: [],
    };

    const response = await axios.get(`${API_URL}/s3/url`, {
      params: { size: selectedProfileImage ? 1 : 0 }, // 이미지가 선택되었는지에 따라 size 값을 설정
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const preSignedUrl = response.data.preSignedUrl;
    const encodedFileName =  response.data.encodedFileName;

    const filesToUpload = [];

    if (selectedProfileImage) {
      filesToUpload.push(selectedProfileImage);
    }


    await Promise.all(filesToUpload.map(async (file, i) => {
      try {
        user.file.push({
          fpath: encodedFileName[i],
          fname: encodedFileName[i] + "." + file.name.split('.').pop(),
          fcategory: "프로필",
          ftype : file.name.split('.').pop(),
          uno: uno,
        });
        console.log(encodedFileName[i]);
        console.log(file.type);
        await axios.put(preSignedUrl[i], file, {
          headers: {
            'Content-Type': file.type
          }
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }));

    try {
      console.log(user);
      if(filesToUpload.length===0){
        user.file.push({
          fpath: '기본',
          fname: '기본',
          fcategory: "프로필",
          ftype : '기본',
          uno: uno,
        });
      }
      const response = await axios.put(`${API_URL}/user/update/${uno}`, user, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      console.log('Update response:', response.data);
      handleProfileEdit(response.data); // 프로필 수정 완료 후 처리할 작업 호출
      updates();
      onClose();
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
                  <img src={bgfile} alt="배경사진" />
                </div>
              </div>
              <div className={styled.editBox}>
                <div className={styled.edit}>
                  <div className={styled.profile__image}>
                    <div className={styled.image__iconBox}>
                      <label htmlFor="attach-file">

                          <div className={styled.image__icon}>
                            <IoCameraOutline />
                          </div>

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
                        <img src={imgs} alt='프로필 이미지' />
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
                        onChange={(e) => setNickname(e.target.value)}
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
