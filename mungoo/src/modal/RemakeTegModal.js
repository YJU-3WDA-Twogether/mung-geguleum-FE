import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/RemakeModal.css';
import '../styles/RemakeTegModal.css';
import jwt from "jwt-decode";

const RemakeTegModal = ({ showPopup, setShowPopup, onSelectPosts }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 5;
  const API_URL = process.env.REACT_APP_API_URL;
  const [selectedPosts, setSelectedPosts] = useState([]);
  const {uno,nickname,uid,role} = jwt(localStorage.getItem('accessToken'));
  const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
};

  const handleOutsideClick = (e) => {
    if (e.target.className === 'layer-popup show') {
      setShowPopup(false);
    }
  };

  const closeModal = () => {
    setShowPopup(false);
  };

    useEffect(() => {
      fetchData();
    }, []);

  const fetchData = async (params) => {
    try {
      const response = await axios.get(`${API_URL}/log/getdownlist`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },});
      setData(response.data.content);
      setTotalPages(Math.ceil(response.data.content.length / PAGE_SIZE));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSelectPost = (post) => {
    const index = selectedPosts.indexOf(post);
    let updatedPosts;
    if (index === -1) {
      updatedPosts = [...selectedPosts, post];
    } else {
      updatedPosts = [...selectedPosts.slice(0, index), ...selectedPosts.slice(index + 1)];
    }

    setSelectedPosts(updatedPosts);
    onSelectPosts(updatedPosts);
  };

  const pageData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleCompleteSelection = () => {
    if (selectedPosts.length > 0) {
      //체크박스 1개이상 선택하지 않을시 alert메세지
      closeModal();
    } else {
      alert('재창작 태그를 선택해주세요.');
    }
  };
  return (
    <>
      <div className={`Remake layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
        <div className="Remake layer-popup show">
          <div className="Remake modal-dialog">
            <div className="Remake modal-content" style={{ borderRadius: '10px' }}>
              <table className="RemakeTagTable">
                <tbody>

                  {pageData.map((item, index) =>
                      (
                    <tr key={item.lno}>
                      <td className="RemakeTagCell">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                      <td className="RemakeTagCell">{item.ptitle}</td>
                      <td className="RemakeTagCell">{item.unickname}</td>
                      <td className="RemakeTagCell">{new Date(item.regDate).toLocaleString()}</td>
                      <td className="RemakeTagCell">
                        <input
                          type="checkbox"
                          checked={selectedPosts.indexOf(item) !== -1}
                          onChange={() => handleSelectPost(item)}
                          className="RemakeTagCheckbox"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="Remake pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={`page-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button type="button" className="Remake-Selected" onClick={handleCompleteSelection}>
                선택 완료
              </button>
            </div>
          </div>
          <button type="button" className="close-button" onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default RemakeTegModal;
