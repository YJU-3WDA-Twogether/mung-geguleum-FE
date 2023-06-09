import React, { useEffect, useState } from 'react';
import { HiOutlineSparkles } from "react-icons/hi";
import PageView from "../components/PageView";
import PageCreate from "../components/PostCreate";
import { TopCategory } from "../topCatgory/TopCategory";
function StoriesPage() {
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
                    text={"놀이터"}
                    iconName={<HiOutlineSparkles />}
                />
                <PageCreate pageNum={3}/>
                <PageView pageNum={"놀이터"}/>
            </>
        );
    }, []);

    return <div>{pageView}</div>;
}
export default StoriesPage;