import React from "react";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineSparkles} from "react-icons/hi";
import PageCreate from "../components/PostCreate";
import PageView from "../components/PageView";
function MusicPage(){

    return (
        <div>
            <TopCategory
                home={"home"}
                text={"음악"}
                iconName={<HiOutlineSparkles />}
            />
            <PageCreate pageNum={2}/>
            <PageView pageNum={"음악"}/>

        </div>
    );
}
export default MusicPage;