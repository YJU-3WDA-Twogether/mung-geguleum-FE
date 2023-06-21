import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import styled from "../styles/SelectNoInfo.module.css";
import style from "../styles/SelectMenuBtn.module.css";
import MyLog from "./MyLog";


import '../styles/PageModal.css';
// import styled from "../styles/PostView.module.css";
import pfile from "../image/Profile.jpg";
// import pfile from "../image/Profile.jpg";


function MyPostView() {
    const [selected, setSelected] = useState(1);

    // [박진석, 23.06.21] 
    const dummyComments = {
        comment: [
          {
            uname: "John",
            reply: "Lorem ipsum dolor sit amet.",
            regDate: "2023-06-19T10:30:00",
          },
          {
            uname: "Jane",
            reply: "Consectetur adipiscing elit.",
            regDate: "2023-06-20T15:45:00",
          },
          {
            uname: "Alex",
            reply: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            regDate: "2023-06-21T08:20:00",
          },
          {
            uname: "John",
            reply: "Lorem ipsum dolor sit amet.",
            regDate: "2023-06-19T10:30:00",
          },
          {
            uname: "Jane",
            reply: "Consectetur adipiscing elit.",
            regDate: "2023-06-20T15:45:00",
          },
          {
            uname: "Alex",
            reply: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            regDate: "2023-06-21T08:20:00",
          },
          {
            uname: "John",
            reply: "Lorem ipsum dolor sit amet.",
            regDate: "2023-06-19T10:30:00",
          },
          {
            uname: "Jane",
            reply: "Consectetur adipiscing elit.",
            regDate: "2023-06-20T15:45:00",
          },
          {
            uname: "Alex",
            reply: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            regDate: "2023-06-21T08:20:00",
          },
        ],
      };

    const handleClick = (n) => {
        setSelected(n);
    };


    return (
        <>
            <div className={styled.container}>
                <div className={styled.main__container}>
                    <nav className={styled.categoryList}>
                        <div
                            onClick={() => handleClick(1)}
                            className={`${style.container} ${ style.sizeContainer}`}
                        >
                            <div
                                className={`${style.btnBox} ${ selected === 1 && style.selectedBox}`}
                            >
                                <p>좋아요</p>
                            </div>
                        </div>
                        <div
                            onClick={() => handleClick(2)}
                            className={`${style.container} ${ style.sizeContainer}`}
                        >
                            <div
                                className={`${style.btnBox} ${ selected === 2 && style.selectedBox}`}
                            >
                                <p>댓글</p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {selected === 1 && 
                <div>
                    좋아요
                </div>
            }
            {selected === 2 &&
                <div>
                    <div className="scrollable">
                        {dummyComments.comment.map((i, index) => {
                            const localDate = new Date(i.regDate).toLocaleString();
                            return (
                                <React.Fragment key={index}>
                                    <div className="container_reply" style={{borderBottom:"1px solid #ebebeb"}}>
                                        <img
                                            src={pfile}
                                            alt="profileImg"
                                            className={styled.profile__image}
                                            width="30"
                                            height="30"
                                        /> 
                                        <div className="comment-text">
                                            <p>
                                                <span className="comment-author">{i.uname}</span>
                                                <span className="comment-content">{i.reply}</span>
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

                    {/* <div className="scrollable">
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
                                    <p>pfile</p>
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
                    </div> */}
                    

                </div>
            }
        </>
    );
}
export default MyPostView;