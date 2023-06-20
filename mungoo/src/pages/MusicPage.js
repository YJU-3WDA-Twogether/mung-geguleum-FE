import React from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import PageView from "../components/PageView";
import PageCreate from "../components/PostCreate";
import { TopCategory } from "../topCatgory/TopCategory";


 const MusicPage = ({handlePostClick}) => {
    const handleClick = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked' , uno);
    };
 

    return (
        <div>
            <TopCategory
                home={"home"}
                text={"음악"}
                iconName={<HiOutlineSparkles />}
            />
            <PageCreate pageNum={2}/>
            <PageView  handlePostClick={handleClick} pageNum={"음악"}/>

        </div>
    );
};
export default MusicPage;