import axios from "axios";
import jwt from "jwt-decode";
import React, { useEffect, useRef, useState } from 'react';
import { BsFire, BsPersonFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { SiApplemusic } from "react-icons/si";
import { TfiWrite } from "react-icons/tfi";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import UserEtcBtn from "../button/UserEtcBtn";
import { useNweetEctModalClick } from "../hooks/useNweetEctModalClick";
import styled from '../styles/MainNavigation.module.css';

const API_URL = process.env.REACT_APP_API_URL;

function MainNavigation({ onSelectPost, MainClose, handlePostUno, setSearchQuery }) {
    const userEtcRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin check

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const decodedToken = jwt(localStorage.getItem('accessToken'));
        setIsAdmin(decodedToken.role === 'ADMIN'); // Set isAdmin state based on the user's role
    }, []);

    const { uno, nickname, uid, role ,fpath} = jwt(localStorage.getItem('accessToken'));
    const { nweetEtc: userEtc, setNweetEtc: setUserEtc } = useNweetEctModalClick(userEtcRef);

    const toggleUserEtc = () => {
        setUserEtc((prev) => !prev);
    };

    const onLogOutClick = async() => {
        const ok = window.confirm("로그아웃 하시겠어요?");
        if (ok) {
            setUser({});
            navigate("/auth");

            await axios.get(`${API_URL}/user/logout`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
            localStorage.clear();

        }
    };

    return (
        <>
            <section className={styled.container}>
                <div className={styled.wrapper}>
                    <div className={styled.leftBar__category}>
                        <div className={styled.leftBar__logobox}>
                            <div className={styled.leftBar__logo}>
                                <img
                                    src={process.env.PUBLIC_URL + '/MainLogo.png'}
                                    alt="로고 이미지"
                                    className="Logo-Image"
                                    style={{ width: '100px', height: 'auto', marginLeft: '10px' }}
                                    onClick={MainClose}
                                />
                            </div>
                        </div>
                        <nav className={styled.leftBar__container}>
                            <ul>
                                <li>
                                    <div className={styled.leftBar__list} onClick={() => {
                                        setSearchQuery("");
                                        handlePostUno();
                                        onSelectPost('Best');
                                    }}>
                                        <BsFire style={{ color: "#6667ab" }} />
                                        <span>
                                            <b>베스트 모음</b>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styled.leftBar__list} onClick={() => {
                                        setSearchQuery("");
                                        handlePostUno();
                                        onSelectPost('Music');
                                    }}>
                                        <SiApplemusic style={{ color: "#6667ab" }} />
                                        <span>
                                            <b>음악</b>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styled.leftBar__list} onClick={() => {
                                        setSearchQuery("");
                                        handlePostUno();
                                        onSelectPost('Remake');
                                    }}>
                                        <VscGitPullRequestCreate style={{ color: "#6667ab" }} />
                                        <span>
                                            <b>재창작</b>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styled.leftBar__list} onClick={() => {
                                        setSearchQuery("");
                                        handlePostUno();
                                        onSelectPost('Stories');
                                    }}>
                                        <TfiWrite style={{ color: "#6667ab" }} />
                                        <span>
                                            <b>놀이터</b>
                                        </span>
                                    </div>
                                </li>
                                {!isAdmin && ( // Render 마이페이지 only when isAdmin is false
                                    <li>
                                        <div className={styled.leftBar__list} onClick={() => {
                                            setSearchQuery("");
                                            handlePostUno();
                                            onSelectPost('My');
                                        }}>
                                            <BsPersonFill style={{ color: "#6667ab" }} />
                                            <span>
                                                <b>마이페이지</b>
                                            </span>
                                        </div>
                                    </li>
                                )}
                                {/* 관리자페이지 */}
                                {isAdmin && ( // Render 관리자 페이지 only when isAdmin is true
                                    <li>
                                        <div className={styled.leftBar__list} onClick={() => {
                                            handlePostUno();
                                            onSelectPost('ADMIN');
                                        }}>
                                            <RiAdminFill style={{ color: "#6667ab" }} />
                                            <span>
                                                <b>관리자 페이지</b>
                                            </span>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                    <div style={{ position: "relative" }} ref={userEtcRef}>
                        {userEtc && (
                            <UserEtcBtn
                                onLogOutClick={onLogOutClick}
                                creatorInfo={1}
                            />
                        )}
                        <section className={styled.leftBar__user}>
                            <div className={styled.leftBar__userInfo} onClick={toggleUserEtc}>
                                <div className={styled.userInfo__profile}>
                                    <img
                                        src={fpath}
                                        alt="profileImg"
                                        className={styled.profile__image}
                                    />
                                </div>
                                <div className={styled.userInfo__name}>
                                    <p>{nickname}</p>
                                    <p>@{uid}</p>
                                </div>
                                <div className={styled.userInfo__etc}>
                                    <FiMoreHorizontal />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MainNavigation;