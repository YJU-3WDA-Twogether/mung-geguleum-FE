// import React, { useEffect, useState } from "react";
// import { Route, Switch, useLocation } from "react-router-dom";

import styled from "../styles/SelectNoInfo.module.css";
import style from "../styles/SelectMenuBtn.module.css";
import MyLog from "./MyLog";

import PageView from "../components/PageView";

import '../styles/MyComment.css';
// import styled from "../styles/PostView.module.css";
// import pfile from "../image/Profile.jpg";


import React, {useEffect, useRef, useState} from 'react';
import style1 from "../styles/PostView.module.css";
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
import {IoMdPeople, IoMdPerson} from "react-icons/io";
import {HiBell} from "react-icons/hi";
import D3 from "./D3";
import {useNweetEctModalClick} from "../hooks/useNweetEctModalClick";
const API_URL = process.env.REACT_APP_API_URL;


function MyPostView({handlePostClick,selectedPostUno}) {
  const [selected, setSelected] = useState(1);

  const handleClick = (n) => {
    setSelected(n);
  };

  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState([]);
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
  console.log(selectedPostUno)
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
              console.log(`useEffect() - params(selectedPostUno O): ` + params);
              
          } else {
              const params = {
                  uno: uno,
              };
              fetchPosts(params);
              console.log(`useEffect() - params(selectedPostUno X): ` + params);
          }
          console.log(`useEffect() - uno: ` + uno)
      }

  }, [user.uno, selectedPostUno]);

  // [23.06.24|박진석] Axios 이용해 서버에서 내 댓글 리스트 가져온 후, Post 배열에 담음
  const fetchReply = async () => {
      try {
          const response = await axios.get(`${API_URL}/reply/getMyReply`,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
          });
          console.log(`fetchReply() - response.data.content: ` + response.data.content);
          setReply(response.data.content);
          // [23.06.25|박준홍] 문제 해결! - fetchReply()에서 setReply()를 수행하는 게 아닌 setPost()를 수행하여 같은 Post[]를 사용하기 때문에 발생함
          // 새로운 reply[] 배열을 추가하여 setReply()를 추가하여 배열을 공유하지 않고 분리하여 문제를 해결함
          // 준홍씨 개쩔어
          
      } catch (error) {
          console.error(error);
      }
  };

  // [23.06.24|박진석] Axios 이용해 서버에서 내 좋아요 리스트 가져온 후, Post 배열에 담음
  const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/heart/getMyHeart`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }});
        

        console.log(`fetchPosts() - response.data.content:` + response.data.content);
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
  const handleSlideChange = (currentIndex) => {
      setFileNum(currentIndex);
  };

  const pnoClick = (postId) => {
      setSelectedPostId(postId);
      setClickedPostId(postId);
      setShowPopup(true);
  };

  const toggleDropdown = (postId) => {
      setDropdownPostId(postId === dropdownPostId ? null : postId);
  };
  const toggleNweetEct = () => {
      setNweetEtc((prev) => !prev);
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

  return (
    <>
      <div className={styled.container}>
        <div className={styled.main__container}>
          <nav className={styled.categoryList}>
            <div
              onClick={() => {handleClick(1); fetchPosts();}}
              className={`${style.container} ${style.sizeContainer}`}
            >
              <div
                className={`${style.btnBox} ${selected === 1 && style.selectedBox}`}
              >
                <p>좋아요</p>
              </div>
            </div>
            <div
              onClick={() => {handleClick(2); fetchReply();}}
              className={`${style.container} ${style.sizeContainer}`}
            >
              <div
                className={`${style.btnBox} ${selected === 2 && style.selectedBox}`}
              >
                <p>댓글</p>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* [23.06.22|박진석] 내기록 - 좋아요 부분 추가 (더미데이터로만 구성함) */}
      {selected === 1 &&
        <div>
          <div className="Scrollable">
            {posts.map((post) => (
              <li className={style1.nweet}>
                <div className={style1.nweet__wrapper} >
                  <div className={style1.nweet__container} key={post.pno}>
                    <div
                      className={style1.nweet__profile}
                    >
                      <img
                        src={pfile}
                        alt="profileImg"
                        className={style1.profile__image}
                        onClick={() => handlePostClick(post.uno)}
                      />
                    </div>
                    <div className={style1.userInfo}>
                      <div className={style1.userInfo__name}>
                        <div
                          className={style1.userInfo__one}
                        >
                          <p>{post.nickname}</p>
                        </div>
                        <div className={style1.userInfo__two}>
                          <p onClick={() => handlePostClick(post.uno)}>
                            @{post.uid}
                          </p>
                          <p style={{ margin: "0 4px" }}>·</p>
                          <p className={style1.nweet__createdAt}>
                            {new Date(post.regDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {uno === post.uno && (
                        <div className={style1.nweet__edit} ref={etcRef}>
                          <div className={style1.nweet__editIcon} onClick={toggleNweetEct}>
                            <IoWarningOutline />
                            <div className={style1.horizontal__bg}></div>
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
                  <div className={style1.nweet__text}>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#6667ab', paddingBottom: '5px' }}>{post.title}</p>
                    <h4>{post.content}</h4>
                  </div>

                  <div className={style1.nweet__image}>
                
                  </div>
                  <nav className={style1.nweet__actions}>
                    <div className={`${style1.actionBox} ${style1.like} `}>
                      <div className={style1.actions__icon} onClick={() => handleHeartClick(post.pno, post.hexist)}>
                        {post.hexist ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
                      </div>
                      <div className={style1.actions__text}>
                        {post.hcount === 0 ? null : (
                          <p className={style1.like}>
                            {post.hcount}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`${style1.actionBox} ${style1.comment}`}>
                      <div
                        className={style1.actions__icon}
                      >
                        <FaRegComment onClick={() => pnoClick(post.pno)} />
                      </div>
                      <div className={style1.actions__text}>
                        {post.rcount === 0 ? null : (
                          <p>
                            {post.rcount}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className={`${style1.actionBox}`}
                    >
                      <div className={style1.actions__icon}>
                        <FiDownload onClick={() => downloadFile(post.file[fileNum])} />
                      </div>
                      <div className={style1.actions__text}>
                        {post.lcount === 0 ? null : (
                          <p>
                            {post.lcount}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`${style1.actionBox}`}>
                      <div className={style1.actions__icon} onClick={() => toggleDropdown(post.pno)}>
                        <FiMoreHorizontal />
                      </div>
                      {dropdownPostId === post.pno && (
                        <Dropdown.Menu show style={{ left: '73.5%' }}>
                          <Dropdown.Item onClick={() => { handleActionClick(post.pno, 0); setDropdownPostId(null); }}>
                            <p><IoMdPeople /> 전체 그래프</p>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => { handleActionClick(post.pno, 1); setDropdownPostId(null); }}>
                            <p><IoMdPerson />단일 그래프</p>
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2" onClick={() => setDropdownPostId(null)}>
                            <p><HiBell />신고하기</p>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      )}
                      {modalPostId === post.pno && (
                        <div style={modalStyles}>
                          <button
                            onClick={handleCloseModal}
                            style={closeButtonStyles}
                            onMouseEnter={() => setCloseButtonStyles({ ...closeButtonStyles, ...closeButtonHoverStyles })}
                            onMouseLeave={() => setCloseButtonStyles({
                              ...closeButtonStyles,
                              color: "white" // Resetting the color to default on mouse leave
                            })}
                          >
                            Close
                          </button>
                          <D3 handlePostClick={handlePostClick} d3num={d3num} modalPostId={modalPostId} />
                        </div>
                      )}
                    </div>
                  </nav>
                </div>
              </li>
            ))}
          </div>
        </div>
      }

      {/* [23.06.21|박진석] 내기록 - 댓글 부분 추가 */}
      {/* 
        [23.06.22|박진석] 댓글 
        내 댓글 구현을 위한 데이터(예정): pfile(원본게시글 유저 프사), uname(원본게시글 유저 닉넴), ptitle(게시글제목), reply(댓글 내용),
                                        regDate(수정날짜), pno(게시글 번호 - 링크 클릭시 상세정보 페이지로 이동하기 위한 번호)
        백엔드 협조 예정: https://github.com/YJU-3WDA-Twogether/mung-geguleum-backend/issues/22
      */}
      {/* 
        [23.06.24|박진석] 내 댓글 보기 구현 완료 
      */}
      {selected === 2 &&
        <div>
          <div className="commentScrollable">
            {reply.map((reply) => {
              const localDate = new Date(reply.modDate).toLocaleString();
              return (
                
                  <div className="container_reply">
                    <img
                      src={pfile}
                      alt="profileImg"
                      className="profile_image"
                    />
                    <div className="comment-text">
                      <p>
                        <span className="comment-user">{reply.nickname}</span>
                        <span className="comment-author">{reply.postname}</span>
                      </p>
                      <span className="comment-content">{reply.reply}</span>
                      <div>
                        <p style={{ color: "#6667AB" }}>{localDate}</p>
                        {console.log(`regdate: ` + reply.modDate)}
                      </div>

                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      }
    </>
  );
}
export default MyPostView;