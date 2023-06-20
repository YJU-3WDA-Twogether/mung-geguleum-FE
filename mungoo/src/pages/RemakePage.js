import React, {useEffect, useState} from 'react';
import PostRemakeCreate from "../components/PostRemakeCreate";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineBell} from "react-icons/hi";
import PageView from "../components/PageView";

function RemakePage({handlePostClick }){
    const [pageView, setPageView] = useState(null);
    const handleClick  = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked:', uno);
    };

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
                    iconName={<HiOutlineBell />}
                />
                <PostRemakeCreate/>
                <PageView handlePostClick={handleClick} pageNum={"재창작"}/>
            </>
        );
    }, []);

    return <div>{pageView}</div>;
}

export default RemakePage;