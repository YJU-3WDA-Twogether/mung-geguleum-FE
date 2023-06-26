import axios from 'axios';
import jwt from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { BsCalendar3 } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import bgfile from "../image/background.jpg";
import ProfileEditModal from '../modal/ProfileEditModal';
import style from "../styles/MyPageBtn.module.css";
import styled from "../styles/Mypage.module.css";
import { TopCategory } from "../topCatgory/TopCategory";
import MyLikeView from "./MyLikeView";
import MyLog from "./MyLog";
import MyPostView from "./MyPostView";

const API_URL = process.env.REACT_APP_API_URL;
function MyPage({ handlePostClick, selectedPostUno ,MainClose}) {

    const [user, setUser] = useState({});
    const [user2, setUser2]= useState({});
    const [selected, setSelected] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const {uno,nickname,uid,role} = jwt(localStorage.getItem('accessToken'));


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleProfileEdit = () => {
        // Handle the profile edit logic here
        // This function will be called when the "Save" button is clicked inside the modal
        // Perform the necessary actions, such as updating the user's profile data
        // You can access form data or perform API calls here
        // Once the editing is done, you can close the modal by calling handleCloseModal()
        handleCloseModal();
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

    const handleClick = (n) => {
        setSelected(n, () => {
            console.log(selected);
        });
    };
    useEffect(() => {
        if (selectedPostUno) {
            fetchUserInfo(selectedPostUno,2);
        }
        else{
            fetchUserInfo(uno,1);
        }
    }, [selectedPostUno]);

    const update = () =>{
        fetchUserInfo(uno,1);
    }
    const fetchUserInfo = async (pno,num) => {
        try {
            const response = await axios.get(`${API_URL}/user/read/${pno}`);
            const userInfo = response.data;
            // 받아온 회원 정보를 사용하거나 상태에 저장 등 필요한 작업 수행
            if(num===1){
                setUser(userInfo);
            }
            else{
                setUser2(userInfo);
            }
            // ...
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };


    return (
        <section className={styled.container}>
            <div className={styled.main__container}>

                <TopCategory
                    text={selectedPostUno === null ? user.uid :user2.uid}
                    iconName={<IoArrowBackOutline />}
                    iconName2={<IoMdExit />}
                    MainClose={MainClose}
                />
                <div className={styled.setUserInfo}>
                    <div className={styled.backImage}>
                        <img src={bgfile} alt="배경사진" />
                    </div>
                    <div className={styled.profile}>
                        <div className={styled.profile__edit}>
                            <div className={styled.profile__image}>
                                <img src={selectedPostUno  === null ? user.fpath : user2.fpath} alt="프로필 이미지" />
                            </div>
                            {selectedPostUno === user2.uno ? null : (
                                <div className={styled.profile__editBtn} onClick={handleOpenModal}
                                >
                                    프로필 수정
                                </div>
                            )}

                            <ProfileEditModal
                                open={openModal}
                                onClose={handleCloseModal}
                                handleProfileEdit={handleProfileEdit}
                                nicknames ={user.nickname}
                                imgs={user.fpath}
                                introduces={user.introduce}
                                updates={update}
                            />
                        </div>
                        <div className={styled.profile__info}>
                            <div className={styled.userInfo}>
                                <p>{selectedPostUno  === null ? user.nickname :user2.nickname}</p>
                                <p>@{selectedPostUno  === null  ? user.uid :user2.uid}</p>
                            </div>
                            <div className={styled.profile__desc}>
                                <p>{selectedPostUno  === null ? user.introduce : user2.introduce}</p>
                            </div>
                            <div className={styled.profile__createdAt}>
                                <BsCalendar3 />
                                <p>가입일 :{ selectedPostUno  === null ? new Date(user.regDate).toLocaleString() : new Date(user2.regDate).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className={styled.categoryList}>
                    <div
                        onClick={() => handleClick(1)}
                        className={`${style.container} ${ style.sizeContainer}`}
                    >
                        <div
                            className={`${style.btnBox} ${selected === 1 && style.selectedBox}`}
                        >
                            <p>내 활동</p>
                        </div>
                    </div>
                    {selectedPostUno === user2.uno ? null : (
                        <div
                            onClick={() => handleClick(2)}
                            className={`${style.container} ${ style.sizeContainer}`}
                        >
                            <div
                                className={`${style.btnBox} ${selected === 2 && style.selectedBox}`}
                            >
                                <p>내 기록</p>
                            </div>
                        </div>
                    )}
                    <div
                        onClick={() => handleClick(3)}
                        className={`${style.container} ${ style.sizeContainer}`}
                    >
                        <div
                            className={`${style.btnBox} ${selected === 3 && style.selectedBox}`}
                        >
                            <p>내 게시판</p>
                        </div>
                    </div>
                </nav>
                {selected === 1 && <MyLog selectedPostUno={selectedPostUno} />}
                {selected === 2 && <MyLikeView />}
                {selected === 3 && <MyPostView selectedPostUno={selectedPostUno}/>}
            </div>
        </section>
    );
}
export default MyPage;