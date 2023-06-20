
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

import styled from "../styles/SearchBar.module.css";
/*
import SearchBox from "./SearchBox";
*/

export const SearchBar = ({ userObj }) => {
    const searchRef = useRef();
    const textRef = useRef();

    return (
        <article className={styled.container}>
            <section className={styled.searchbox}>
                <div
                    className={`${styled.search} ${styled.search__focus}`}
                    ref={searchRef}
                >
                    <FiSearch
                        className={`${styled.search__icon} ${
                             styled.search__focusIcon
                        }`}
                    />
                    <input
                        className={styled.search__bar}
                        placeholder="검색"
                    />
                </div>
            </section>
        </article>
    );
};