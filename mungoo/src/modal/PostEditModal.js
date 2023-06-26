import jwt from "jwt-decode";
import React, { useState } from 'react';
import pfile from "../image/Profile.jpg";
import '../styles/PageModal.css';
import style from "../styles/PostEidt.module.css";
import styled from "../styles/PostView.module.css";
const API_URL = process.env.REACT_APP_API_URL;

const PostEditModal = ({ showPopup, setShowPopup ,closeModal}) => { // 상태값과 함수 전달받음

    const [postData, setPostData] = useState(null);
    const [comment, setComment] = useState("");

    const {uno,nickname,uid,role} = jwt(localStorage.getItem('accessToken'));

    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowPopup(false);
        }
    };

    return (
        <>
            <div className={`layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
                <div className="layer-popup show">
                    <div className="modal-dialog" style={{  borderRadius:  '10px 10px'}}>
                        <div className="modal-content" style={{ borderRadius: '10px 0 0 10px', overflow: 'hidden'}}>


                        </div>
                        <div className="modal-content app" style={{ borderRadius: '0 10px 10px 0'}}>
                            {postData && (
                                <>
                                    <div className="fixedUp" >
                                        <img
                                            src={pfile}
                                            alt="profileImg"
                                            className={styled.profile__image}
                                        />
                                        <div style={{paddingLeft:"8px"}}>
                                            <p> <span className="comment-author">{postData.title}</span>
                                                {new Date(postData.regDate).toLocaleString()} { postData.nickname}</p>
                                            <p>{postData.content}</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="fixedDown">
                                <form  >
                                    <div className={style.editBox}>
                                        <div className={style.edit}>
                                            <div className={`${style.edit}`}>
                                                <div className={style.edit__InputBox}>
                                                    <p>제목</p>
                                                    <input
                                                        maxLength="25"
                                                        className={style.edit__Input}
                                                        spellCheck="false"
                                                        type="text"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className={`${style.edit}`}>
                                                <div className={style.edit__InputBox}>
                                                    <p>내용</p>
                                                    <textarea
                                                        row="3"
                                                        className={`${style.edit__Input} ${style.edit__textarea}`}
                                                        spellCheck="false"
                                                        type="text"
                                                        maxLength={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input className="replySmit" type="submit" value="수정" disabled={comment === ""}/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button className="close-button" onClick={closeModal}> X </button>
                </div>
            </div>
        </>
    );
};

export default PostEditModal;