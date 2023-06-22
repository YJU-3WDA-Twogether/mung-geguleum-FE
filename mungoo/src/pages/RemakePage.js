import React, {useEffect, useState} from 'react';
import PostRemakeCreate from "../components/PostRemakeCreate";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineBell} from "react-icons/hi";
import PageView from "../components/PageView";

function RemakePage({handlePostClick }){
    const [newPosts, setNewPosts] = useState(false);

    const handleClick  = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked:', uno);
    };

    return <div>
        <TopCategory
        home={"home"}
        text={"재창작"}
        iconName={<HiOutlineBell />}
    />
        <PostRemakeCreate setNewPosts={setNewPosts}/>
        <PageView handlePostClick={handleClick} pageNum={"재창작"} newPosts={newPosts} setNewPosts={setNewPosts}/>
    </div>;
}

export default RemakePage;