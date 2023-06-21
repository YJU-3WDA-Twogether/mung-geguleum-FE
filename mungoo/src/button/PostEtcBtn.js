
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import styled from "../styles/PostEtcBtn.module.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const PostEtcBtn = ({
                        postNum,
                        fetchPosts,
                        uno
                     }) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("구름을 삭제할까요?");

        if (ok === true) {
            const response = await axios.delete(`${API_URL}/post/delete/${postNum}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }});
            console.log('uno:', uno);
            fetchPosts({ uno });
        }
    };



    return (
        <div className={styled.container}>
            <div className={`${styled.btn} ${styled.updateBtn}`} >
                <FiEdit />
                <p>수정하기</p>
            </div>
            <div
                className={`${styled.btn} ${styled.deleteBtn}`}
                onClick={onDeleteClick}
            >
                <FiTrash2 />
                <p>삭제하기</p>
            </div>
        </div>
    );
};
export default PostEtcBtn;