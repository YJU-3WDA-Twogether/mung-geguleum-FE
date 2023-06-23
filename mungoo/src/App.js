import React, { useEffect, useState } from 'react';
import Routers from './routes/Routers';
import styled from "./styles/App.module.css";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('accessToken');
        if (storedUser) {
            setUserObj(storedUser);
        }
        setInit(true);
    }, []);

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