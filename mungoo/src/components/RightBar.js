import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import styled from "../styles/RightBar.module.css";
const RightBar = ({ userObj }) => {
    const location = useLocation();
    const [hiddenSearch, setHiddenSearch] = useState(false);


    return (
        <article className={styled.container}>
            <SearchBar userObj={userObj} />
        </article>
    );
};

export default RightBar;