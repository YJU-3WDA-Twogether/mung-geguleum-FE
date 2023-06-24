import React,{useEffect,useState} from 'react';
import '../styles/PageModal.css';
import axios from "axios";
import pfile from "../image/Profile.jpg";
import styled from "../styles/PostView.module.css";
import jwt from "jwt-decode";
import {FiMoreHorizontal} from "react-icons/fi";
const API_URL = process.env.REACT_APP_API_URL;

const PageModal = ({ showPopup, setShowPopup, postId, handlePostClick}) => { // 상태값과 함수 전달받음

    const [postData, setPostData] = useState(null);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState({});
    const {uno,nickname,uid,role} = jwt(localStorage.getItem('accessToken'));
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);
    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowPopup(false);
        }
    };

    const closeModal = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const postread = async () => {
            try {
                const response = await axios.get(`${API_URL}/post/read/${postId}`);
                const data = response.data;
                setPostData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching node data:', error);
            }
        };

        if (postId) {
            postread();
        } else {
            setPostData(null);
        }
    }, [postId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTimestamp = new Date().toISOString();

        const formData = {
            reply:comment,
            pno: postId,
            deph : 1,
            uname: nickname,
            regDate: currentTimestamp // 현재 시간을 추가합니다.
        };
        console.log(formData)
        try {
            const response = await axios.post(`${API_URL}/reply/create`, formData, config);
            console.log(response.data);

            if (postData) {
                setPostData({
                    ...postData,
                    reply: [...postData.reply, { ...formData, rno: response.data.rno }]
                });
                // Reset comment input field
                setComment("");
            }
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <>
            <div className={`layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
                <div className="layer-popup show">
                    <div className="modal-dialog" style={{  borderRadius:  '10px 10px'}}>
                        {postData && postData.file.length > 0 && (
                            <div className="modal-content" style={{ borderRadius: '10px 0 0 10px', overflow: 'hidden'}}>
                                {/* 파일 표시 영역 내용 */}
                                {postData.file.map((item, index) => (
                                    <div key={index}>

                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="modal-content app" style={{ borderRadius: postData && postData.file.length > 0 ? '0 10px 10px 0' : '10px 10px'}}>
                            {postData && (
                                <>
                                    <div className="fixedUp" >
                                        <img
                                            src={pfile}
                                            alt="profileImg"
                                            className={styled.profile__image}
                                            onClick={() => handlePostClick(postData.uno)}
                                        />
                                        <div style={{paddingLeft:"8px"}}>
                                            <p> <span className="comment-author">{postData.title}</span>
                                                {new Date(postData.regDate).toLocaleString()} { postData.nickname}</p>
                                            <p>{postData.content}</p>
                                        </div>
                                    </div>
                                    <div className="scrollable">
                                        {postData.reply.map((comment, index) => {
                                            const localDate = new Date(comment.regDate).toLocaleString();
                                            return (
                                                <React.Fragment key={index}>
                                                    <div className="container_reply">
                                                        <img
                                                            src={pfile}
                                                            alt="profileImg"
                                                            className={styled.profile__image}
                                                        />
                                                        <div className="comment-text">
                                                            <p>
                                                                <span className="comment-author">{comment.uname}</span>
                                                                <span className="comment-content">{comment.reply}</span>
                                                            </p>
                                                            <div className="comment-date">
                                                                <p style={{color:"#6667AB"}}>{localDate}</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            <div className="fixedDown">
                                <form onSubmit={handleSubmit} >
                                    <label>
                                        <input type="text" value={comment}
                                               onChange={e => setComment(e.target.value)}
                                               placeholder="댓글.."
                                               className="replyInput"
                                        />
                                    </label>
                                    <input className="replySmit" type="submit" value="작성" disabled={comment === ""}/>
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

export default PageModal;