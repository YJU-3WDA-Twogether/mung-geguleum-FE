
import styled from "../styles/RightBar.module.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar"
const RightBar = ({ searchQuery,  setSearchQuery}) => {

    return (
        <article className={styled.container}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </article>
    );
};

export default RightBar;