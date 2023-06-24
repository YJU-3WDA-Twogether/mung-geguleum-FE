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

  const updateUserGrade = async (user) => {
    try {
      console.log(user);
      const response = await axios.put(
        `${API_URL}/user/update/${user.uno}`, user,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
        }
      );

      // 등급 업데이트에 성공하면 서버로부터 업데이트된 사용자 정보를 받아와서 업데이트합니다.
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
      console.log(uno);
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
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.uno}>
              <td>{user.uid}</td>
              <td>{user.uname}</td>
              <td>{new Date(user.regDate).toLocaleDateString()}</td>
              <td>
                <select
                  value={user.grade}
                  onChange={(e) => updateUserGrade(user, e.target.value)}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="BEN">BEN</option>
                  <option value="DROP">DROP</option>
                  <option value="USER">USER</option>
                </select>
              </td>
              <td>
                <span
                  className="DeleteIcon"
                  onClick={() => deleteUser(user.uno)}
                >
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
