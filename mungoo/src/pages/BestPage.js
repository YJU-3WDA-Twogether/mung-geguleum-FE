import React from 'react';
import { HiOutlineSparkles } from "react-icons/hi";
import PostView from "../components/PageView";
import '../styles/PageModal.css';
import { TopCategory } from "../topCatgory/TopCategory";


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
                iconName={<HiOutlineSparkles />}
            />
            <PostView handlePostClick={handleClick} pageNum={"베스트"} />
        </>
    );
};
export default BestPage;