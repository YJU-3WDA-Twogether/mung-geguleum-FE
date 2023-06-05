import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageModal from "../modal/PageModal";
import styled from '../styles/PostView.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import pfile from "../image/Profile.jpg";
import {FaRegComment, FaRegHeart,FaHeart} from "react-icons/fa";
import {FiDownload, FiMoreHorizontal} from "react-icons/fi";

const API_URL = process.env.REACT_APP_API_URL;


const PostView = ({ selectedPost, handlePostClick }) => {
    const [posts, setPosts] = useState([]);
    const [fileNum,setFileNum] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [clickedPostId, setClickedPostId] = useState(null);
    const [user, setUser] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

    const downloadFile = (file) => {
        const params = {
            uno: user.uno,
            pno: file.pno,
        };

        axios.get(`${API_URL}/file/download/${file.fno}`, { params, responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = file.fname;
                link.click();
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_URL}/post/getlist`);
                console.log(response.data.content);
                setPosts(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);

    const handleHeartClick = async (postId) => {
        const formData = {
            pno: postId,
            uno: user.uno
        };
        try {
            if (likedPosts.includes(postId)) {
                // If the post is already liked, send a DELETE request
                const response = await axios.delete(`${API_URL}/heart/delete`, { data: formData });
                console.log(response.data);

                // Update likedPosts state
                setLikedPosts(likedPosts.filter(id => id !== postId));
            } else {
                // If the post is not liked yet, send a POST request
                const response = await axios.post(`${API_URL}/heart/get`, formData);
                console.log(response.data);
                // Update likedPosts state
                setLikedPosts([...likedPosts, postId]);
            }
        } catch (error) {
            console.error('Error updating heart data:', error);
        }
    };
    const handleSlideChange = (currentIndex) => {
        setFileNum(currentIndex);
    };

    const pnoClick = (postId) => {
        setSelectedPostId(postId);
        setClickedPostId(postId);
        setShowPopup(true);
    };

    return (
        <>
            {posts.map((post) => (
            <li className={styled.nweet}>
                <div className={styled.nweet__wrapper}>
                        <div className={styled.nweet__container} key={post.pno}>
                            <div
                                className={styled.nweet__profile}
                            >
                                <img
                                    src={pfile}
                                    alt="profileImg"
                                    className={styled.profile__image}
                                    onClick={() => handlePostClick(post.uno)}
                                />
                            </div>
                            <div className={styled.userInfo}>
                                <div className={styled.userInfo__name}>
                                    <div
                                        className={styled.userInfo__one}
                                    >
                                        <p>{post.nickname}</p>
                                    </div>
                                    <div className={styled.userInfo__two}>
                                        <p onClick={() => handlePostClick(post.uno)}>
                                            @{post.uid}
                                        </p>
                                        <p style={{ margin: "0 4px" }}>·</p>
                                        <p className={styled.nweet__createdAt}>
                                            {post.regDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className={styled.nweet__text}>
                        <p style={{fontWeight:'bold', fontSize:'18px', color:'#6667ab', paddingBottom:'5px'}}>{post.title}</p>
                        <h4>{post.content}</h4>
                    </div>
                    <div className={styled.nweet__image}>
                        {post.file.length > 0 && (
                            <Carousel
                                showThumbs={false}
                                onChange={handleSlideChange}
                            >
                                {post.file.map((file) => (
                                    <div key={file.fno}>
                                        {file.fname.match(/.(jpg|jpeg|png|gif)$/i) ? (
                                            <img src={`${API_URL}/file/read/${file.fno}`} alt="file" />
                                        ) : file.fname.match(/.(mp4|webm)$/i) ? (
                                            <video controls>
                                                <source
                                                    src={`${API_URL}/file/read/${file.fno}`}
                                                    type={`video/${file.fname.split('.').pop()}`}
                                                />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : file.fname.match(/.(mp3|wav)$/i) ? (
                                            <audio controls>
                                                <source
                                                    src={`${API_URL}/file/read/${file.fno}`}
                                                    type={`audio/${file.fname.split('.').pop()}`}
                                                />
                                                Your browser does not support the audio tag.
                                            </audio>
                                        ) : (
                                            <div className="file-wrap">{file.fname}</div>
                                        )}
                                    </div>
                                ))}
                            </Carousel>
                        )}
                    </div>
                    <nav className={styled.nweet__actions}>
                        <div className={`${styled.actionBox} ${styled.like} `}>
                            <div className={styled.actions__icon} onClick={() => handleHeartClick(post.pno)}>
                                {likedPosts.includes(post.pno) ? <FaHeart style={{color:"red"}}/> : <FaRegHeart />}
                            </div>
                            <div className={styled.actions__text}>
                                {post.hcount === 0 ? null : (
                                    <p className={styled.like}>
                                        {post.hcount}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={`${styled.actionBox} ${styled.comment}`}>
                            <div
                                className={styled.actions__icon}
                            >
                                <FaRegComment  onClick={() => pnoClick(post.pno) }/>
                            </div>
                            <div className={styled.actions__text}>
                                {post.rcount === 0 ? null : (
                                    <p>
                                        {post.rcount}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div
                            className={`${styled.actionBox}`}
                        >
                            <div className={styled.actions__icon}>
                                <FiDownload  onClick={() => downloadFile(post.file[fileNum])} />
                            </div>
                            <div className={styled.actions__text}>
                                <p>
                                   312
                                </p>
                            </div>
                        </div>
                        <div
                            className={`${styled.actionBox}`}
                        >
                            <div className={styled.actions__icon}>
                                <FiMoreHorizontal/>
                            </div>
                        </div>
                    </nav>

                </div>
            </li>
            ))}
            <PageModal
                showPopup={showPopup && selectedPostId === clickedPostId}
                setShowPopup={setShowPopup}
                postId={showPopup && selectedPostId === clickedPostId ? clickedPostId : null}
            />

        </>
    );
};

export default PostView;
