import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserAgreePage from "../pages/UserAgreePage";
import styled from "../styles/AuthForm.module.css";
const API_URL = process.env.REACT_APP_API_URL;


const AuthForm = ({ newAccount, setUserObj }) => {
  const navigate = useNavigate();

  const INITIAL_FORM_DATA_ACCOUNT = {
    uid: '',
    password: '',
  }
  
  const INITIAL_FORM_DATA_REGISTRATION = {
    uid: '',
    uname: '',
    password: '',
    password2: '',
    email: '',
    nickname: '',
  };

  const [formData, setFormData] = useState(newAccount ? INITIAL_FORM_DATA_ACCOUNT : INITIAL_FORM_DATA_REGISTRATION);
  const [select, setSelect] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(true);

  const handleCloseAgreement = (agreed) => {
    setShowAgreement(false);
    setAgreed(agreed);
  };

  const handleAgreementCheckbox = (e) => {
    setAgreed(e.target.checked);
    setShowAgreement(e.target.checked);
  };


  
  useEffect(() => {
    setFormData(newAccount ? INITIAL_FORM_DATA_ACCOUNT : INITIAL_FORM_DATA_REGISTRATION);
  }, [newAccount]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAccount) {
      try {
        const response = await axios.post(`${API_URL}/user/login`, formData);
        localStorage.setItem("accessToken", response.data);
        alert('로그인에 성공하였습니다.');
        localStorage.setItem('user', JSON.stringify(response.data));
        setUserObj(response.data);
        navigate('/');
      } catch (error) {
        console.error(error);
        alert('로그인 중 오류가 발생했습니다.');
      }
    } else {
      try {
        const response = await axios.post(`${API_URL}/user/create`, formData);
        console.log(response.data);
        if (response.data === true) {
          alert('회원가입이 완료되었습니다.');
          try {
            const loginResponse = await axios.post(`${API_URL}/user/login`, {
              uid: formData.uid,
              password: formData.password,
            });
            localStorage.setItem("accessToken", loginResponse.data);
            localStorage.setItem('user', JSON.stringify(loginResponse.data));
            setUserObj(loginResponse.data);
            navigate('/');
          } catch (error) {
            console.error(error);
            alert('로그인 중 오류가 발생했습니다.');
          }
        } else if (response.data === false) {
          alert('회원가입 중 오류가 발생했습니다.');
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error(error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const handleAgreement = () => {
    setAgreed(!agreed);
  };

    

    // 비밀번호 확인 함수
    const handlePasswordCheck = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setPasswordMatch(formData.password === value); // 비밀번호와 비밀번호 확인 값 비교
    };

    // 이메일 유효성 검사 함수
    const handleEmailValidation = (e) => {
        const { value } = e.target;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(value)); // 이메일 형식 검사
        handleChange(e); // 이메일 값을 상태에 저장
    };


    return (
        <div className={styled.container}>
            <form onSubmit={handleSubmit} className={styled.wrapper}>
                {newAccount ? (
                    <>
                        <input
                            name="uid"
                            placeholder="아이디"
                            value={formData.uid}
                            onChange={handleChange}
                            className={`${styled.authInput} ${
                                select === "uid" && styled.select
                            }`}
                            onFocus={() => setSelect("uid")}
                            onBlur={() => setSelect("")}
                        />
                        <input
                            className={`${styled.authInput} ${
                                select === "password" && styled.select
                            }`}
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={() => setSelect("password")}
                            onBlur={() => setSelect("")}
                        />
                    </>
                ) : (
                    <>
      
                        <input
                            className={`${styled.authInput} ${
                                select === "uid" && styled.select
                            }`}
                            onFocus={() => setSelect("uid")}
                            onBlur={() => setSelect("")}
                            type="text"
                            name="uid"
                            placeholder="아이디"
                            value={formData.uid}
                            onChange={handleChange}
                        />
                        <input
                            className={`${styled.authInput} ${
                                select === "uname" && styled.select
                            }`}
                            onFocus={() => setSelect("uname")}
                            onBlur={() => setSelect("")}
                            type="text"
                            name="uname"
                            placeholder="이름"
                            value={formData.uname}
                            onChange={handleChange}
                        />
                        <input
                            className={`${styled.authInput} ${
                                select === "password" && styled.select
                            }`}
                            onFocus={() => setSelect("password")}
                            onBlur={() => setSelect("")}
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            className={`${styled.authInput} ${
                                select === "password2" && styled.select
                            }`}
                            onFocus={() => setSelect("password2")}
                            onBlur={() => setSelect("")}
                            type="password"
                            name="password2"
                            placeholder="비밀번호 확인"
                            value={formData.password2}
                            onChange={handlePasswordCheck} // 비밀번호 확인 함수 사용
                        />
                        {!passwordMatch && formData.password2 && (
                            <p className={styled.errorMessage}>비밀번호가 일치하지 않습니다.</p>
                        )}
                        <input
                            className={`${styled.authInput} ${
                                select === "email" && styled.select
                            }`}
                            onFocus={() => setSelect("email")}
                            onBlur={() => setSelect("")}
                            type="email"
                            name="email"
                            placeholder="이메일"
                            value={formData.email}
                            onChange={handleEmailValidation} // 이메일 유효성 검사 함수 사용
                        />
                        {!emailValid && formData.email && (
                            <p className={styled.errorMessage}>유효한 이메일 형식이 아닙니다.</p>
                        )}
                        <input
                            className={`${styled.authInput} ${
                                select === "nickname" && styled.select
                            }`}
                            onFocus={() => setSelect("nickname")}
                            onBlur={() => setSelect("")}
                            type="text"
                            name="nickname"
                            placeholder="닉네임"
                            value={formData.nickname}
                            onChange={handleChange}
                        /> 
                      <div className={styled.agreement}>
                                    <input
                                        type="checkbox"
                                        id="agreement"
                                        checked={agreed}
                                        onChange={handleAgreementCheckbox}
                                    />
                                    <label htmlFor="agreement">회원 약관에 동의합니다.</label>
                        </div>                           
                                                
                    </>    

                )}
                {!newAccount && agreed && (
                 <div className={styled.container}>
                 {showAgreement && (
                   <div className={styled.agreementForm}>
                     <div className={styled.agreementContent}>
                       <h3>이용약관</h3>
                       <p>
                        <UserAgreePage/>
                       </p>
                     </div>
                     <button className={styled.closeButton} onClick={handleCloseAgreement}>
                       동의
                     </button>
                     <button className={styled.closeButton} onClick={() => handleCloseAgreement(false)}>
                       비동의
                     </button>
                   </div>
                 )}
               </div>
        )}             
              <input
                      type="submit"
                      className={`${styled.authInput} ${styled.authSubmit}`}
                      value={newAccount ? "로그인 하기" : "가입하기"}
                      disabled={!agreed && !newAccount}
                    />
            </form>
        </div>
    );
};

export default AuthForm;