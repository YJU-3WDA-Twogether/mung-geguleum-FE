import React, { useState } from "react";
import style from "../styles/MyPageBtn.module.css";
import styled from "../styles/Mypage.module.css";
import ReportPage from "./ReportPage";
import UserListPage from "./UserListPage";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineBell} from "react-icons/hi";
import {IoMdExit} from "react-icons/io";

const AdminPage = ({handlePostClick}) => {
    const [selected, setSelected] = useState(1);

    const handleClick = (n) => {
        setSelected(n);
    };

    return (
        <>
            <TopCategory
            text={"관리자 페이지"}
            iconName2={<IoMdExit />}
         />
        <section className={styled.container}>
            <div className={styled.main__container}>
                <nav className={styled.categoryList}>
                    <div
                        onClick={() => handleClick(1)}
                        className={`${style.container} ${ style.sizeContainer}`}
                    >
                        <div
                            className={`${style.btnBox} ${selected === 1 && style.selectedBox}`}
                        >
                            <p>유저 리스트</p>
                        </div>
                    </div>
                    <div
                        onClick={() => handleClick(3)}
                        className={`${style.container} ${ style.sizeContainer}`}
                    >
                        <div
                            className={`${style.btnBox} ${selected === 3 && style.selectedBox}`}
                        >
                            <p>신고 사항</p>
                        </div>
                    </div>
                </nav>
                {selected === 1 && <UserListPage/>}
                {selected === 3 && <ReportPage handlePostClick={handlePostClick}/>}
            </div>
        </section>
        </>
    );
}   
export default AdminPage;

