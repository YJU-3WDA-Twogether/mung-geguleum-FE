import React, { useEffect, useState } from 'react';
import { HiOutlineSparkles } from "react-icons/hi";
import PageView from "../components/PageView";
import PostRemakeCreate from "../components/PostRemakeCreate";
import { TopCategory } from "../topCatgory/TopCategory";

const RemakePage = ({handlePostClick}) => {
    const handleClick = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked' , uno);
    };

    const [pageView, setPageView] = useState(null);

   
    

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            // setPageView(<PageView />);
            return;
        }
        setPageView(
            <>
                <TopCategory
                    home={"home"}
                    text={"재창작"}
                    iconName={<HiOutlineSparkles />}
                />
                <PostRemakeCreate/>
                <PageView handlePostClick={handleClick} pageNum={"재창작"}/>
            </>
        );
    }, []);

    return <div>{pageView}</div>;
};


export default RemakePage;