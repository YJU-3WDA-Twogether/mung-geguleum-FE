import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { GoTriangleDown } from "react-icons/go";
import { IoMdExit } from "react-icons/io";
import styled from "../styles/UserEtcBtn.module.css";

const UserEtcBtn = ({ creatorInfo, userEtc, onLogOutClick }) => {

    const [user, setUser] = useState({});
    const {uno,nickname,uid,role,fpath} = jwt(localStorage.getItem('accessToken'));
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

    return (
        <div className={styled.container__box}>
            <div className={styled.container}>
                <div className={`${styled.btn} ${styled.updateBtn}`}>
                    <div className={styled.leftBar__userInfo}>
                        <div className={styled.userInfo__profile}>
                            <img
                                src={fpath}
                                alt="profileImg"
                                className={styled.profile__image}
                            />
                        </div>
                        <div className={styled.userInfo__name}>
                            <p>{nickname}</p>
                            <p>@{uid}</p>
                        </div>
                        <div className={styled.userInfo__etc}>
                            <BiCheck />
                        </div>
                    </div>
                </div>
                <div
                    className={`${styled.btn} ${styled.deleteBtn}`}
                    onClick={onLogOutClick}
                >
                    <div className={styled.userInfo__etc}>
                        <IoMdExit />
                    </div>
                    <p>로그아웃</p>
                </div>
            </div>
            <div className={styled.box__triangle}>
                <GoTriangleDown />
            </div>
        </div>
    );
};

export default UserEtcBtn;