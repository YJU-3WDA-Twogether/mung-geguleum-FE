import axios from 'axios';
import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/Offcanvas.css';

const API_URL = process.env.REACT_APP_API_URL;

const OffcanvasModal = ({ show, onHide }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const { nickname } = jwt(localStorage.getItem('accessToken'));
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log(JSON.parse(storedUser));
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/log/getdownlist`, config);
        setData(response.data.content);
        console.log(response.data.content);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="Offusernick">
            {nickname}님 알림
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="scrollable-content">
        <ListGroup>
        {data.map((item) => (
          <ListGroup.Item key={item.lno}  style={{ marginBottom: '10px' }}>
          <div className='alarm-content'>
            <p>{new Date(item.regDate).toLocaleDateString()}</p>
            {item.unickname}님이 {item.lsname} 하셨습니다.
          </div>  
          </ListGroup.Item>
        ))}
    </ListGroup>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasModal;
