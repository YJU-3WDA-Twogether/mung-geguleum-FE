import React, { useEffect, useState } from 'react';
import styled from "./styles/App.module.css";
import Routers from './routes/Routers';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserObj(JSON.parse(storedUser));
        }
        setInit(true);
    }, []);
    const checkTokenExpiration = (token) => {
        // 토큰의 만료 일자를 추출
        const expirationDate = new Date(token.expirationDate); // 토큰 객체에서 만료 일자를 추출하는 예시입니다.

        // 현재 시간을 가져옴
        const currentTime = new Date();

        // 토큰의 만료 여부를 확인
        if (currentTime.getTime() > expirationDate.getTime()) {
            // 토큰이 만료된 경우
            return true;
        } else {
            // 토큰이 유효한 경우
            return false;
        }
    };
    const handleLogout = async () => {
        localStorage.clear();
        setUserObj(null);
    };

    return (
        <>
            {init ? (
                <Routers isLoggedIn={Boolean(userObj)} userObj={userObj} handleLogout={handleLogout} setUserObj={setUserObj}/>
            ) : (
                <div className={styled.render__loading}>
                   로딩
                </div>
            )}
        </>
    );
}

export default App;
