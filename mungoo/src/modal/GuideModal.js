import React,{useEffect,useState} from 'react';
import guide from "../image/가이드.png";
const API_URL = process.env.REACT_APP_API_URL;

const GuideModal = ({ showModal, setShowModal}) => { // 상태값과 함수 전달받음

    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowModal(false);
        }
    };


    return (
        <>
            <div className={`layer-popup ${showModal ? 'show' : ''}`} onClick={handleOutsideClick}>
                <img src={guide} style={{width:"700px"}}/>
            </div>

        </>
    );
};

export default GuideModal;