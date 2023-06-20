import React, { useState } from 'react';
import '../styles/PageModal.css';
import PostView from "../components/PageView";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineSparkles,HiOutlineBell} from "react-icons/hi";
import PageView from "../components/PageView";


const BestPage = ({handlePostClick }) => {
    const handleClick  = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked:', uno);
    };

    return (
        <>
            <TopCategory
                home={"home"}
                text={"베스트"}
                iconName={<HiOutlineBell />}
            />
            <PostView handlePostClick={handleClick} pageNum={"베스트"} />
        </>
    );
};
export default BestPage;
