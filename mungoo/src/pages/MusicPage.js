import React, {useState} from "react";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineBell} from "react-icons/hi";
import PageCreate from "../components/PostCreate";
import PageView from "../components/PageView";
function MusicPage({handlePostClick}){
    const [newPosts, setNewPosts] = useState(false);
    const handleClick  = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked:', uno);
    };

    return (
        <div>
            <TopCategory
                home={"home"}
                text={"음악"}
                iconName={<HiOutlineBell />}
            />
            <PageCreate pageNum={2} setNewPosts={setNewPosts}/>
            <PageView handlePostClick={handleClick} pageNum={"음악"} newPosts={newPosts} setNewPosts={setNewPosts}/>

        </div>
    );
}
export default MusicPage;