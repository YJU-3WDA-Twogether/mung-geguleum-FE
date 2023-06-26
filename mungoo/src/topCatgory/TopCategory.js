import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OffcanvasModal from "../modal/OffCanvasModal";
import styled from "../styles/TopCategory.module.css";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const TopCategory = ({
  creatorInfo,
  iconName,
  iconName2,
  text,
  home,
  myNweets,
  MainClose,
}) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setShowOffcanvas(true);
  };

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };
  const onLogOutClick = async() => {
    const ok = window.confirm("로그아웃 하시겠어요?");
    if (ok) {
      navigate("/auth");

      await axios.get(`${API_URL}/user/logout`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });
      localStorage.clear();
    }
  };

  return (
    <>
      {home === "home" ? (
        <div className={styled.main__category}>
          <div className={styled.main_text}>
            <h2>{text}</h2>
          </div>
          <div className={styled.effect_icon} onClick={handleIconClick}>
            {iconName}
          </div>
        </div>
      ) : (
        <div className={styled.minor__category}>
          <div className={styled.minor__icon} onClick={MainClose}>
            {iconName}
          </div>
          <div className={styled.userInfo}>
            <p className={styled.category__name}>{text}</p>
          </div>
          {iconName2 && (
            <div className={styled.minor__iconExit} onClick={onLogOutClick}>
              {iconName2}
            </div>
          )}
        </div>
      )}
      
      <OffcanvasModal show={showOffcanvas} onHide={handleOffcanvasClose} />
    </>
  );
};
