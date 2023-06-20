import React from "react";
import { Offcanvas } from "react-bootstrap";
import jwt from "jwt-decode";

const OffcanvasModal = ({ show, onHide }) => {

  const {uno,nickname,uid,role} = jwt(localStorage.getItem('accessToken'));

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{nickname}의 알림</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="scrollable-content">
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
          <p>ajsd</p><br></br>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasModal;
