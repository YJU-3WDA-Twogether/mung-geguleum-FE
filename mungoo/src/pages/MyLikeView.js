import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import styled from "../styles/SelectNoInfo.module.css";
import style from "../styles/SelectMenuBtn.module.css";
import MyLog from "./MyLog";
function MyPostView() {
    const [selected, setSelected] = useState(1);

    const handleClick = (n) => {
        setSelected(n);
    };


    return (
        <>
            <div className={styled.container}>
                <div className={styled.main__container}>
                    <nav className={styled.categoryList}>
                        <div
                            onClick={() => handleClick(1)}
                            className={`${style.container} ${ style.sizeContainer}`}
                        >
                            <div
                                className={`${style.btnBox} ${ selected === 1 && style.selectedBox}`}
                            >
                                <p>좋아요</p>
                            </div>
                        </div>
                        <div
                            onClick={() => handleClick(2)}
                            className={`${style.container} ${ style.sizeContainer}`}
                        >
                            <div
                                className={`${style.btnBox} ${ selected === 2 && style.selectedBox}`}
                            >
                                <p>댓글</p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {selected === 1 && 
                <div>
                    좋아요
                </div>
            }
            {selected === 2 &&
                <div>
                  댓글
            </div>
            }
        </>
    );
}
export default MyPostView;