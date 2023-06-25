import React, { useEffect, useState } from 'react';
import { HiOutlineBell } from "react-icons/hi";
import PageView from "../components/PageView";
import PageCreate from "../components/PostCreate";
import { TopCategory } from "../topCatgory/TopCategory";
function StoriesPage({handlePostClick}) {
    const [pageView, setPageView] = useState(null);

    const [newPosts, setNewPosts] = useState(false);
    const handleClick  = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked:', uno);
    };
    const handlePostSubmit = (newPost) => {
        setNewPosts((prevPosts) => [...prevPosts, newPost]);
    };

    return <div>
        <TopCategory
        home={"home"}
        text={"놀이터"}
        iconName={<HiOutlineBell />}
     />
        <PageCreate pageNum={3} onPostSubmit={handlePostSubmit} setNewPosts={setNewPosts} />
        <PageView handlePostClick={handleClick} pageNum={"놀이터"} newPosts={newPosts} setNewPosts={setNewPosts}/>
    </div>;
}
export default StoriesPage;