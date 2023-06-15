import React, { useEffect, useState } from 'react';
import { HiOutlineSparkles } from "react-icons/hi";
import PageView from "../components/PageView";
import PostRemakeCreate from "../components/PostRemakeCreate";
import { TopCategory } from "../topCatgory/TopCategory";

function RemakePage(){
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
                <PageView pageNum={"재창작"}/>
            </>
        );
    }, []);

    return <div>{pageView}</div>;
}

export default RemakePage;