import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OffcanvasModal from "../modal/OffCanvasModal";
import styled from "../styles/TopCategory.module.css";
const API_URL = process.env.REACT_APP_API_URL;

export const TopCategory = ({
  creatorInfo,
  iconName,
  iconName2,
  text,
  home,
  myNweets,
  onLogOutClick,
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
