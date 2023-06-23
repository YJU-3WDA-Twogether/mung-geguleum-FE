
import React from "react";
import { SearchBar } from "../components/SearchBar";
import styled from "../styles/RightBar.module.css";
const RightBar = ({ searchQuery,  setSearchQuery}) => {

    return (
        <article className={styled.container}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </article>
    );
};

export default RightBar;