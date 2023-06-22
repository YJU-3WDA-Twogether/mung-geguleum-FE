import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import styled from "../styles/SelectNoInfo.module.css";
import style from "../styles/SelectMenuBtn.module.css";
import MyLog from "./MyLog";

import PageView from "../components/PageView";

import '../styles/MyComment.css';
// import styled from "../styles/PostView.module.css";
import pfile from "../image/Profile.jpg";


function MyPostView() {
    const [selected, setSelected] = useState(1);

    // [박진석, 23.06.21]
    const dummyComments = {
        comments: [
          {
            pfile: "https://example.com/profile1.jpg",
            uname: "사용자1",
            ptitle: "게시글 제목 1",
            reply: "첫 번째 댓글 내용입니다.",
            regDate: "2023-06-20T10:30:00",
            pno: 1,
          },
          {
            pfile: "https://example.com/profile2.jpg",
            uname: "사용자2",
            ptitle: "게시글 제목 2",
            reply: "두 번째 댓글 내용입니다.",
            regDate: "2023-06-21T11:45:00",
            pno: 2,
          },
          {
            pfile: "https://example.com/profile3.jpg",
            uname: "사용자3",
            ptitle: "게시글 제목 3",
            reply: "세 번째 댓글 내용입니다.",
            regDate: "2023-06-22T13:20:00",
            pno: 3,
          },
          {
            pfile: "https://example.com/profile4.jpg",
            uname: "사용자4",
            ptitle: "게시글 제목 4",
            reply: "네 번째 댓글 내용입니다.",
            regDate: "2023-06-23T15:10:00",
            pno: 4,
          },
          {
            pfile: "https://example.com/profile5.jpg",
            uname: "사용자5",
            ptitle: "게시글 제목 5",
            reply: "다섯 번째 댓글 내용입니다.",
            regDate: "2023-06-24T17:25:00",
            pno: 5,
          },
          {
            pfile: "https://example.com/profile6.jpg",
            uname: "사용자6",
            ptitle: "게시글 제목 6",
            reply: "여섯 번째 댓글 내용입니다.",
            regDate: "2023-06-25T09:55:00",
            pno: 6,
          },
          {
            pfile: "https://example.com/profile7.jpg",
            uname: "사용자7",
            ptitle: "게시글 제목 7",
            reply: "일곱 번째 댓글 내용입니다.",
            regDate: "2023-06-26T14:40:00",
            pno: 7,
          },
          {
            pfile: "https://example.com/profile8.jpg",
            uname: "사용자8",
            ptitle: "게시글 제목 8",
            reply: "여덟 번째 댓글 내용입니다.",
            regDate: "2023-06-27T12:20:00",
            pno: 8,
          },
          {
            pfile: "https://example.com/profile9.jpg",
            uname: "사용자9",
            ptitle: "게시글 제목 9",
            reply: "아홉 번째 댓글 내용입니다.",
            regDate: "2023-06-28T16:30:00",
            pno: 9,
          },
          {
            pfile: "https://example.com/profile10.jpg",
            uname: "사용자10",
            ptitle: "게시글 제목 10",
            reply: "열 번째 댓글 내용입니다.",
            regDate: "2023-06-29T11:50:00",
            pno: 10,
          },
          {
            pfile: "https://example.com/profile11.jpg",
            uname: "사용자11",
            ptitle: "게시글 제목 11",
            reply: "열한 번째 댓글 내용입니다.",
            regDate: "2023-06-30T13:15:00",
            pno: 11,
          },
          {
            pfile: "https://example.com/profile12.jpg",
            uname: "사용자12",
            ptitle: "게시글 제목 12",
            reply: "열두 번째 댓글 내용입니다.",
            regDate: "2023-07-01T15:40:00",
            pno: 12,
          },
          {
            pfile: "https://example.com/profile13.jpg",
            uname: "사용자13",
            ptitle: "게시글 제목 13",
            reply: "열세 번째 댓글 내용입니다.",
            regDate: "2023-07-02T17:20:00",
            pno: 13,
          },
          {
            pfile: "https://example.com/profile14.jpg",
            uname: "사용자14",
            ptitle: "게시글 제목 14",
            reply: "열네 번째 댓글 내용입니다.",
            regDate: "2023-07-03T10:15:00",
            pno: 14,
          },
          {
            pfile: "https://example.com/profile15.jpg",
            uname: "사용자15",
            ptitle: "게시글 제목 15",
            reply: "열다섯 번째 댓글 내용입니다.",
            regDate: "2023-07-04T12:45:00",
            pno: 15,
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
            
            {/* [23.06.22|박진석] 내기록 - 좋아요 부분 임시 추가 */}
            {selected === 1 && 
                <div>
                    좋아요좋요아
                    {/* <div className="scrollable">
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
                    </div> */}
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
                    <div className="scrollable">
                        {dummyComments.comments.map((i, index) => {
                            const localDate = new Date(i.regDate).toLocaleString();
                            return (
                                <React.Fragment key={index}>
                                    <div className="container_reply">
                                        <img
                                            src={pfile}
                                            alt="profileImg"
                                            className="profile_image"
                                        /> 
                                        <div className="comment-text">
                                            <p>
                                                <span className="comment-user">{i.uname}</span>
                                                <span className="comment-author">{i.ptitle}</span>
                                            </p>
                                            <span className="comment-content">{i.reply}</span>
                                            <div>
                                                <p style={{color:"#6667AB"}}>{localDate}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            }
        </>
    );
}
export default MyPostView;