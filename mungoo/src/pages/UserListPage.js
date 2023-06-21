import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import '../styles/UserList.css'; // Import the CSS file

const API_URL = process.env.REACT_APP_API_URL;

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/list`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          params: {
            query: searchQuery // Pass the search query as a parameter
          }
        });
        console.log(response.data);
        setUsers(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  const filteredUsers = users.filter((user) => {
    // Apply your search logic here
    // For example, check if the user's ID or name contains the search query
    return (
      user.uid.includes(searchQuery) || user.uname.includes(searchQuery)
    );
  });

  return (
    <div className='UserList'>
      <h1 className='UserList-h1'>유저 리스트 페이지</h1>
      <input
        className='UserList-Input'
        type="text"
        placeholder="유저 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className='UserList-table'>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>가입날짜</th>
            <th>등급</th>
            <th>유저삭제</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.uno}>
              <td>{user.uid}</td>
              <td>{user.uname}</td>
              <td></td>
              <td></td>
              <td>
                <span className='DeleteIcon'>
                  <TiDelete style={{ fontSize: '24px' }} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
