import React, {useEffect, useRef, useState} from 'react';
import styled from "../styles/PostView.module.css";
import pfile from "../image/Profile.jpg";
import {Carousel} from "react-responsive-carousel";
import {FaHeart, FaRegComment, FaRegHeart} from "react-icons/fa";
import {FiDownload, FiMoreHorizontal} from "react-icons/fi";
import PageModal from "../modal/PageModal";
import axios from "axios";
import jwt from "jwt-decode";
import {IoWarningOutline} from "react-icons/io5";
import PostEtcBtn from "../button/PostEtcBtn";
import Dropdown from "react-bootstrap/Dropdown";
import {IoIosArrowBack, IoIosArrowForward, IoMdPeople, IoMdPerson} from "react-icons/io";
import {HiBell} from "react-icons/hi";
import D3 from "./D3";
import {useNweetEctModalClick} from "../hooks/useNweetEctModalClick";
const API_URL = process.env.REACT_APP_API_URL;
function MyPostView({handlePostClick,selectedPostUno}) {
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
    const [nweetEtc, setNweetEtc ] = useState(null);
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
        if (uno) {
            if (selectedPostUno) {
                const params = {
                    uno: selectedPostUno,
                };
                fetchPosts(params);
            } else {
                const params = {
                    uno: uno,
                };
                fetchPosts(params);
            }
            console.log(uno)
        }

    }, [user, selectedPostUno]);
    const fetchPosts = async (params) => {
        try {
            console.log(params)
            const response = await axios.get(`${API_URL}/post/getMyPost/${params.uno}`);
            console.log(response.data.content);
            setPosts(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };
    const handleHeartClick = async (postId, hexist) => {
        const formData = {
            pno: postId,
        };
        try {
            if (hexist) {
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
    const pnoClick = (postId) => {
        setSelectedPostId(postId);
        setClickedPostId(postId);
        setShowPopup(true);
    };

    const toggleDropdown = (postId) => {
        setDropdownPostId(postId === dropdownPostId ? null : postId);
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

    const toggleNweetEct = (postId) => {
        setNweetEtc(postId === nweetEtc ? null : postId);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (etcRef.current && !etcRef.current.contains(event.target)) {
                setNweetEtc(null);
                setDropdownPostId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const [postSlides, setPostSlides] = useState({});

    const handleSlideChange = (postId, index) => {
        setPostSlides(prevSlides => ({
            ...prevSlides,
            [postId]: index
        }));
    };
    const handleButtonClick = (postId, increment) => {
        const post = posts.find((post) => post.pno === postId);
        if (post) {
            setPostSlides((prevSlides) => {
                const currentIndex = prevSlides[postId] || 0;
                const newIndex = (currentIndex + increment + post.file.length) % post.file.length;
                return {
                    ...prevSlides,
                    [postId]: newIndex,
                };
            });

            setFileNum((prevNum) => (prevNum + increment + post.file.length) % post.file.length);
        }
    };
    const handleBell = async (postId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            };

            const response = await axios.post(
                `${API_URL}/log/report/${postId}`,
                null,
                config
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            {posts.map((post) => (
                <li className={styled.nweet}>
                    <div className={styled.nweet__wrapper} >
                        <div className={styled.nweet__container} key={post.pno}>
                            <div
                                className={styled.nweet__profile}
                            >
                                <img
                                    src={post.fpath}
                                    alt="profileImg"
                                    className={styled.profile__image}
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
                                    <div className={styled.nweet__edit}  >
                                        <div className={styled.nweet__editIcon} onClick={() => toggleNweetEct(post.pno)}>
                                            <IoWarningOutline />
                                            <div className={styled.horizontal__bg}></div>
                                        </div>
                                        {nweetEtc === post.pno && (
                                            <div ref={etcRef}>
                                                <PostEtcBtn postNum={post.pno}  fetchPosts={fetchPosts} uno={uno} />
                                            </div>
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
                                <div style={{ position: 'relative' }}>
                                    <Carousel
                                        showStatus={false}
                                        showArrows={false}
                                        showThumbs={false}
                                        selectedItem={postSlides[post.pno] || 0}
                                        onChange={(selectedIndex) => handleSlideChange(post.pno, selectedIndex)}
                                    >
                                        {post.file.map((file) => (
                                            <div key={file.fno}>
                                                {file.ftype === '.jpg' || file.ftype === '.jpeg' || file.ftype === '.png' ||
                                                file.ftype === '.JPG' || file.ftype === '.JPEG' || file.ftype === '.PNG' ? (
                                                    <img src={file.fpath} alt="file" />
                                                ) : (
                                                    <video controls>
                                                        <source src={file.fpath} type="video/webm" />
                                                    </video>
                                                )}
                                            </div>

                                        ))}
                                    </Carousel>
                                    <button
                                        type="button"
                                        onClick={() => handleButtonClick(post.pno, -1)}
                                        style={{
                                            position: 'absolute',
                                            left: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#000',
                                            fontSize: '1.5rem',
                                        }}
                                    >
                                        <IoIosArrowBack size={35} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleButtonClick(post.pno, 1)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#000',
                                            fontSize: '1.5rem',
                                        }}
                                    >
                                        <IoIosArrowForward size={35} />
                                    </button>
                                </div>
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
                                    {post.file[fileNum] && (
                                        <FiDownload onClick={() => downloadFile(post.file[fileNum])} />
                                    )}
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
                                    <div  ref={etcRef}>
                                        <Dropdown.Menu show style={{left : '73.5%'}}>
                                            <Dropdown.Item onClick={() => { handleActionClick(post.pno,0); setDropdownPostId(null); }}>
                                                <p><IoMdPeople/> 전체 그래프</p>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => { handleActionClick(post.pno,1); setDropdownPostId(null); }}>
                                                <p><IoMdPerson/>단일 그래프</p>
                                            </Dropdown.Item>
                                            <Dropdown.Item  onClick={() => { handleBell(post.pno);  setDropdownPostId(null);}}>
                                                <p><HiBell/>신고하기</p>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </div>
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
        </>
    );
}
export default MyPostView;