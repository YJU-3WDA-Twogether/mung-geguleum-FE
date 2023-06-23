import axios from "axios";
import jwt from "jwt-decode";
import React, { useEffect, useRef, useState } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiDownload, FiMoreHorizontal } from "react-icons/fi";
import { HiBell, HiOutlineBell } from "react-icons/hi";
import { IoMdPeople, IoMdPerson } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import PostEtcBtn from "../button/PostEtcBtn";
import { useNweetEctModalClick } from "../hooks/useNweetEctModalClick";
import pfile from "../image/Profile.jpg";
import PageModal from "../modal/PageModal";
import styled from '../styles/PostView.module.css';
import { TopCategory } from "../topCatgory/TopCategory";
import D3 from "./D3";
const API_URL = process.env.REACT_APP_API_URL;

function SearchPage({ searchQuery, setSearchQuery ,selectedPostUno,handlePostClick}) {

    const [posts, setPosts] = useState([]);
    const [fileNum,setFileNum] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [clickedPostId, setClickedPostId] = useState(null);
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [dropdownPostId, setDropdownPostId] = useState(null);
    const [modalPostId,setModalPostId]  = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const [d3num, setD3num] =  useState(null);
    const {uno,nickname,uid,role} = jwt(localStorage.getItem('accessToken'));
    const etcRef = useRef();
    const { nweetEtc, setNweetEtc } = useNweetEctModalClick(etcRef);

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

    const downloadFile = (file) => {
        const params = {
            uno: user.uno,
            pno: file.pno,
        };

        axios.get(`${API_URL}/file/download/${file.fno}`, { params, responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            } })
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
        if (localStorage.getItem('accessToken')) {
            fetchPosts();
        }
    }, [user.uno, selectedPostUno]);

    const handleHeartClick = async (postId, hexist) => {
        const formData = {
            pno: postId,
        };
        try {
            if (hexist) {
                console.log("댓글 취소 요청입니다.");
                console.log(config.headers)
                console.log(formData.pno)
                const response = await axios.delete(`${API_URL}/heart/delete`, {data: formData ,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }});
                console.log(response.data);

                setLikedPosts(likedPosts.filter((id) => id !== postId));

                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.pno === postId ? { ...post, hexist: false, hcount: post.hcount - 1 } : post
                    )
                );
            } else {
                const response = await axios.post(`${API_URL}/heart/create`, formData,config);
                console.log(response.data);

                setLikedPosts([...likedPosts, postId]);

                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.pno === postId ? { ...post, hexist: true, hcount: post.hcount + 1 } : post
                    )
                );
            }
        } catch (error) {
            console.error('Error updating heart data:', error);
        }
    };
    const handleClick = (uno) => {
        handlePostClick(uno);
    };

    const handleSlideChange = (currentIndex) => {
        setFileNum(currentIndex);
    };

    const pnoClick = (postId) => {
        setSelectedPostId(postId);
        setClickedPostId(postId);
        setShowPopup(true);
    };

    const handleActionClick = (postId, num) => {
        setShowModal(true);
        setModalPostId(postId);
        setD3num(num);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalPostId(null);
    };
//   모달창 CSS
    const modalStyles = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10000, // Set a higher value than the other modal's z-index
        background: "#6667AB",
        padding: "10px",
        borderRadius: "4px",
        backdropFilter: "blur(8px)",
        width: "1200px", // Adjust the width as desired
        height: "900px", // Adjust the height as desired
    };
    const [closeButtonStyles, setCloseButtonStyles] = useState({
        position: "absolute",
        top: "10px",
        right: "20px",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        fontSize: "18px",
        color: "white",
    });

    // You can also add hover styles to change the button appearance on hover
    const closeButtonHoverStyles = {
        color: "black",
    };

//   모달창 CSS

    const toggleDropdown = (postId) => {
        setDropdownPostId(postId === dropdownPostId ? null : postId);
    };
    const toggleNweetEct = () => {
        setNweetEtc((prev) => !prev);
    };


    useEffect(() => {
        if (searchQuery) {
            fetchPosts();
        }
    }, [searchQuery]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_URL}/post/getSearchPost/${searchQuery}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log(response.data);
            setPosts(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };

    console.log("검색페이지야" + searchQuery);

    return (
        <div>
            <TopCategory
                home={"home"}
                text={"검색"}
                iconName={<HiOutlineBell />}
            />
            {posts.map((post) => (
                <li className={styled.nweet}>
                    <div className={styled.nweet__wrapper} >
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
                                            {new Date(post.regDate).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                {uno === post.uno && (
                                    <div className={styled.nweet__edit} ref={etcRef}>
                                        <div className={styled.nweet__editIcon} onClick={toggleNweetEct}>
                                            <IoWarningOutline />
                                            <div className={styled.horizontal__bg}></div>
                                        </div>
                                        {nweetEtc && (
                                            <PostEtcBtn
                                                setNweetEtc={setNweetEtc}
                                                postNum={post.pno}
                                            />
                                        )}
                                    </div>
                                )}
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
                                                <img src={`${API_URL}/file/read/${file.fno}`} alt="file"/>
                                            ) : file.fname.match(/.(mp4|webm|mime)$/i) ? (
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
                                <div className={styled.actions__icon} onClick={() => handleHeartClick(post.pno, post.hexist)}>
                                    {post.hexist ? <FaHeart style={{color:"red"}}/> : <FaRegHeart />}
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
                                    {post.lcount === 0 ? null : (
                                        <p>
                                            {post.lcount}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={`${styled.actionBox}`}>
                                <div className={styled.actions__icon} onClick={() => toggleDropdown(post.pno)}>
                                    <FiMoreHorizontal />
                                </div>
                                {dropdownPostId === post.pno && (
                                    <Dropdown.Menu show style={{left : '73.5%'}}>
                                        <Dropdown.Item onClick={() => { handleActionClick(post.pno,0); setDropdownPostId(null); }}>
                                            <p><IoMdPeople/> 전체 그래프</p>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleActionClick(post.pno,1); setDropdownPostId(null); }}>
                                            <p><IoMdPerson/>단일 그래프</p>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2" onClick={() => setDropdownPostId(null)}>
                                            <p><HiBell/>신고하기</p>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                )}
                                {modalPostId === post.pno && (
                                    <div style={modalStyles}>
                                        <button
                                            onClick={handleCloseModal}
                                            style={closeButtonStyles}
                                            onMouseEnter={() => setCloseButtonStyles({...closeButtonStyles, ...closeButtonHoverStyles})}
                                            onMouseLeave={() => setCloseButtonStyles({
                                                ...closeButtonStyles,
                                                color: "white" // Resetting the color to default on mouse leave
                                            })}
                                        >
                                            Close
                                        </button>
                                        <D3 handlePostClick={handlePostClick} d3num={d3num} modalPostId={modalPostId}/>
                                    </div>
                                )}
                            </div>


                        </nav>
                    </div>
                </li>
            ))}
            <PageModal
                showPopup={showPopup && selectedPostId === clickedPostId}
                setShowPopup={setShowPopup}
                postId={showPopup && selectedPostId === clickedPostId ? clickedPostId : null}
                handlePostClick={handlePostClick}
            />
        </div>
    );
}

export default SearchPage;