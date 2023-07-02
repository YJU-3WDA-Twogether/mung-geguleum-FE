import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import UserUpdateModal from '../modal/UserUpdateModal';
import '../styles/UserList.css'; // Import the CSS file

const API_URL = process.env.REACT_APP_API_URL;

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openUsermodal, setOpenUsermodal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const handleopenUsermodal = (user) => {
    setSelectedUser(user);
    setOpenUsermodal(true);
  };

  const handleCloseUsermodal = () => {
    setOpenUsermodal(false);
  };

  const handleUserUpdate = () => {
    handleCloseUsermodal();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/list`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          params: {
            query: searchQuery
          }
        });
        setUsers(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  const filteredUsers = users.filter((user) => {
    return (
      user.uid.includes(searchQuery) || user.uname.includes(searchQuery)
    );
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayedUsers = filteredUsers.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredUsers.length / postsPerPage);

  const updateUserGrade = async (user) => {
    try {
      const response = await axios.put(
        `${API_URL}/user/update/${user.uno}`,
        user,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
        }
      );
      if (response.status === 200) {
        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.uno === updatedUser.uno ? updatedUser : user
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (uno) => {
    try {
      const response = await axios.delete(`${API_URL}/user/delete/${uno}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });
      if (response.status === 204) {
        const updatedUsers = users.filter((user) => user.uno !== uno);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="UserList">
      <h1 className="UserList-h1">유저 리스트 페이지</h1>
      <input
        className="UserList-Input"
        type="text"
        placeholder="유저 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="UserList-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>가입날짜</th>
            <th>등급</th>
            <th>유저삭제</th>
            <th>유저수정</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.uno}>
              <td>{user.uid}</td>
              <td>{user.uname}</td>
              <td>{new Date(user.regDate).toLocaleDateString()}</td>
              <td>{user.grade}</td>
              <td>
                <span
                  className="DeleteIcon"
                  onClick={() => deleteUser(user.uno)}
                >
                  <TiDelete style={{ fontSize: '24px' }} />
                </span>
              </td>
              <td>
                <button
                  className="UserList-Update"
                  onClick={() => handleopenUsermodal(user)}
                >
                  수정
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UserUpdateModal
          open={openUsermodal}
          onClose={handleCloseUsermodal}
          handleUserUpdate={handleUserUpdate}
          selectedUser={selectedUser}
        />
      )}

      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 5)}
            >
              Prev
            </button>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2)
          )
          .map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                pageNumber === currentPage ? 'active' : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        {currentPage < totalPages && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 5,totalPages )}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserListPage;
