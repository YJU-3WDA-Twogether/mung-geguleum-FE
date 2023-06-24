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
// import styled from "../styles/PostView.module.css";
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

  // [박진석|23.06.21] 좋아요, 댓글용 더미데이터들
  // const dummyComments = {
  //   comments: [
  //     {
  //       pfile: "https://example.com/profile1.jpg",
  //       uname: "사용자1",
  //       ptitle: "게시글 제목 1",
  //       reply: "첫 번째 댓글 내용입니다.",
  //       regDate: "2023-06-20T10:30:00",
  //       pno: 1,
  //     },
  //     {
  //       pfile: "https://example.com/profile2.jpg",
  //       uname: "사용자2",
  //       ptitle: "게시글 제목 2",
  //       reply: "두 번째 댓글 내용입니다.",
  //       regDate: "2023-06-21T11:45:00",
  //       pno: 2,
  //     },
  //     {
  //       pfile: "https://example.com/profile3.jpg",
  //       uname: "사용자3",
  //       ptitle: "게시글 제목 3",
  //       reply: "세 번째 댓글 내용입니다.",
  //       regDate: "2023-06-22T13:20:00",
  //       pno: 3,
  //     },
  //     {
  //       pfile: "https://example.com/profile4.jpg",
  //       uname: "사용자4",
  //       ptitle: "게시글 제목 4",
  //       reply: "네 번째 댓글 내용입니다.",
  //       regDate: "2023-06-23T15:10:00",
  //       pno: 4,
  //     },
  //     {
  //       pfile: "https://example.com/profile5.jpg",
  //       uname: "사용자5",
  //       ptitle: "게시글 제목 5",
  //       reply: "다섯 번째 댓글 내용입니다.",
  //       regDate: "2023-06-24T17:25:00",
  //       pno: 5,
  //     },
  //     {
  //       pfile: "https://example.com/profile6.jpg",
  //       uname: "사용자6",
  //       ptitle: "게시글 제목 6",
  //       reply: "여섯 번째 댓글 내용입니다.",
  //       regDate: "2023-06-25T09:55:00",
  //       pno: 6,
  //     },
  //     {
  //       pfile: "https://example.com/profile7.jpg",
  //       uname: "사용자7",
  //       ptitle: "게시글 제목 7",
  //       reply: "일곱 번째 댓글 내용입니다.",
  //       regDate: "2023-06-26T14:40:00",
  //       pno: 7,
  //     },
  //     {
  //       pfile: "https://example.com/profile8.jpg",
  //       uname: "사용자8",
  //       ptitle: "게시글 제목 8",
  //       reply: "여덟 번째 댓글 내용입니다.",
  //       regDate: "2023-06-27T12:20:00",
  //       pno: 8,
  //     },
  //     {
  //       pfile: "https://example.com/profile9.jpg",
  //       uname: "사용자9",
  //       ptitle: "게시글 제목 9",
  //       reply: "아홉 번째 댓글 내용입니다.",
  //       regDate: "2023-06-28T16:30:00",
  //       pno: 9,
  //     },
  //     {
  //       pfile: "https://example.com/profile10.jpg",
  //       uname: "사용자10",
  //       ptitle: "게시글 제목 10",
  //       reply: "열 번째 댓글 내용입니다.",
  //       regDate: "2023-06-29T11:50:00",
  //       pno: 10,
  //     },
  //     {
  //       pfile: "https://example.com/profile11.jpg",
  //       uname: "사용자11",
  //       ptitle: "게시글 제목 11",
  //       reply: "열한 번째 댓글 내용입니다.",
  //       regDate: "2023-06-30T13:15:00",
  //       pno: 11,
  //     },
  //     {
  //       pfile: "https://example.com/profile12.jpg",
  //       uname: "사용자12",
  //       ptitle: "게시글 제목 12",
  //       reply: "열두 번째 댓글 내용입니다.",
  //       regDate: "2023-07-01T15:40:00",
  //       pno: 12,
  //     },
  //     {
  //       pfile: "https://example.com/profile13.jpg",
  //       uname: "사용자13",
  //       ptitle: "게시글 제목 13",
  //       reply: "열세 번째 댓글 내용입니다.",
  //       regDate: "2023-07-02T17:20:00",
  //       pno: 13,
  //     },
  //     {
  //       pfile: "https://example.com/profile14.jpg",
  //       uname: "사용자14",
  //       ptitle: "게시글 제목 14",
  //       reply: "열네 번째 댓글 내용입니다.",
  //       regDate: "2023-07-03T10:15:00",
  //       pno: 14,
  //     },
  //     {
  //       pfile: "https://example.com/profile15.jpg",
  //       uname: "사용자15",
  //       ptitle: "게시글 제목 15",
  //       reply: "열다섯 번째 댓글 내용입니다.",
  //       regDate: "2023-07-04T12:45:00",
  //       pno: 15,
  //     },
  //   ],
  // };

  const dummyLikes = {
    likes: [
      {
        pfile: "https://example.com/profile1.jpg",
        uname: "John Doe",
        ptitle: "Lorem Ipsum is simply dummy text",
        pno: 1,
      },
      {
        pfile: "https://example.com/profile2.jpg",
        uname: "Emily Smith",
        ptitle: "Aenean commodo ligula eget dolor",
        pno: 2,
      },
      {
        pfile: "https://example.com/profile3.jpg",
        uname: "Alex Johnson",
        ptitle: "Sed ut perspiciatis unde omnis iste natus error sit",
        pno: 3,
      },
      {
        pfile: "https://example.com/profile4.jpg",
        uname: "Sophia Lee",
        ptitle: "Duis aute irure dolor in reprehenderit",
        pno: 4,
      },
      {
        pfile: "https://example.com/profile5.jpg",
        uname: "Michael Brown",
        ptitle: "Excepteur sint occaecat cupidatat non proident",
        pno: 5,
      },
      {
        pfile: "https://example.com/profile6.jpg",
        uname: "Olivia Wilson",
        ptitle: "Ut enim ad minima veniam",
        pno: 6,
      },
      {
        pfile: "https://example.com/profile7.jpg",
        uname: "James Anderson",
        ptitle: "Quis autem vel eum iure reprehenderit qui",
        pno: 7,
      },
      {
        pfile: "https://example.com/profile8.jpg",
        uname: "Emma Taylor",
        ptitle: "Sunt in culpa qui officia deserunt mollit anim",
        pno: 8,
      },
      {
        pfile: "https://example.com/profile9.jpg",
        uname: "William Johnson",
        ptitle: "Nemo enim ipsam voluptatem quia voluptas",
        pno: 9,
      },
      {
        pfile: "https://example.com/profile10.jpg",
        uname: "Ava Davis",
        ptitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        pno: 10,
      },
      {
        pfile: "https://example.com/profile11.jpg",
        uname: "Liam Martin",
        ptitle: "Maecenas nec tincidunt libero, non lacinia nulla",
        pno: 11,
      },
      {
        pfile: "https://example.com/profile12.jpg",
        uname: "Isabella White",
        ptitle: "Fusce vulputate dapibus massa, non tristique ante tristique ac",
        pno: 12,
      },
      {
        pfile: "https://example.com/profile13.jpg",
        uname: "Noah Rodriguez",
        ptitle: "Praesent eget faucibus massa, sit amet tristique dui",
        pno: 13,
      },
      {
        pfile: "https://example.com/profile14.jpg",
        uname: "Mia Martinez",
        ptitle: "Phasellus consectetur libero id leo pharetra",
        pno: 14,
      },
      {
        pfile: "https://example.com/profile15.jpg",
        uname: "Sophia Taylor",
        ptitle: "Vivamus sit amet lorem nec sem consectetur",
        pno: 15,
      },
    ],
  };

  const handleClick = (n) => {
    setSelected(n);
  };

  
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
          } else {
              const params = {
                  uno: uno,
              };
              fetchPosts(params);
          }
          console.log(uno)
      }

  }, [user.uno, selectedPostUno]);
  const fetchReply = async (params) => {
      try {
          console.log(`fetchReply() - params: ` + params);
          const response = await axios.get(`${API_URL}/reply/getMyReply`,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
          });
          console.log(`fetchReply() - response.data.content: ` + response.data.content);
          setPosts(response.data.content);
          
      } catch (error) {
          console.error(error);
      }
  };
  const fetchPosts = async (params) => {
    try {
        console.log(`fetchPosts() - params:` + params)
        // const response = await axios.get(`${API_URL}/post/getMyPost/${params.uno}`);
        const response = await axios.get(`${API_URL}/Reply/getmyreply`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
        });
        console.log(`fetchPosts() - response.data.content:` + response.data.content);
        console.log("getMyPosts 시도중");
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
              onClick={() => handleClick(1)}
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
          <div className="commentScrollable">
            {/* {dummyLikes.likes.map((i, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="container_like">
                                        <img
                                            src={pfile}
                                            alt="profileImg"
                                            className="profile_image"
                                        /> 
                                        <div className="comment-text">
                                            <p><span className="comment-user">{i.uname}</span></p>
                                            <p><span className="comment-author">{i.ptitle}</span></p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })} */}

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
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#6667ab', paddingBottom: '5px' }}>{post.title}</p>
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
                        {post.hexist ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
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
                        <FaRegComment onClick={() => pnoClick(post.pno)} />
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
                        <FiDownload onClick={() => downloadFile(post.file[fileNum])} />
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
      {selected === 2 &&
        <div>
          <div className="commentScrollable">
            {posts.map((post) => {
              const localDate = new Date(post.modDate).toLocaleString();
              return (
                  <div className="container_reply">
                    <img
                      src={pfile}
                      alt="profileImg"
                      className="profile_image"
                    />
                    <div className="comment-text">
                      <p>
                        <span className="comment-user">{post.nickname}</span>
                        <span className="comment-author">{post.postname}</span>
                      </p>
                      <span className="comment-content">{post.reply}</span>
                      <div>
                        <p style={{ color: "#6667AB" }}>{localDate}</p>
                        {console.log(`regdate: ` + post.modDate)}
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