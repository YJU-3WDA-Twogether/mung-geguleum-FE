import React, { useState } from 'react';
import MainNavigation from "./MainNavigation";
import PostController from './PostController';
import styled from "../styles/App.module.css";
import RightBar from "../components/RightBar";

function Main({isLoggedIn,userObj,handleLogout}) {
    const [selectedPost, setSelectedPost] = useState('Best');
    const [selectedMyPage, setSelectedMyPage] = useState("My");
    const [isMyPage, setIsMyPage] = useState(false);
    const [selectedPostUno, setSelectedPostUno] = useState(null); // 게시글의 uno 값
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
    const handleSelectPost = (postName) => {
        setSelectedPost(postName);
        setIsMyPage(false);
    };

    const onSelectMyPage = (myName) => {
        setSelectedMyPage(myName);
    };

    const handleMyPageClick = () => {
        setIsMyPage(true);
    };

    const handlePostClick = (uno) => {
        setIsMyPage(true);
        setSelectedPostUno(uno);
        setSearchQuery("");
        setSelectedPost('My');
    };

    const MainClose = () => {
        setSelectedPost('Best');
        setIsMyPage(false);
        setSelectedPostUno(null);
    };
    const handlePostUno = () => {
        setSelectedPostUno(null);
    };
    

    
    return (
        <div className={styled.container}>
            <>
                <MainNavigation onSelectPost={handleSelectPost}  handlePostUno={handlePostUno}  setSearchQuery={setSearchQuery}/>
            </>

            <div className={styled.center__container}>
                <PostController
                    PostName={selectedPost}
                    handlePostClick={handlePostClick} // handlePostClick 함수 전달
                    selectedPostUno={selectedPostUno} // selectedPostUno 값을 전달
                    MainClose={MainClose}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            <>
                <RightBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </>
        </div>
    );
}

export default Main;