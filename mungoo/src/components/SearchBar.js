import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

import styled from "../styles/SearchBar.module.css";

export const SearchBar = ({ userObj }) => {
    const searchRef = useRef();
    const textRef = useRef();
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    console.log(searchQuery);

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
                        value={searchQuery} // 검색어 상태를 입력값으로 설정
                        onChange={handleSearchChange} // 검색어 변경 핸들러
                    />
                </div>
            </section>
        </article>
    );
};
