import axios from 'axios';
import jwt from "jwt-decode";
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calender.css';

const API_URL = process.env.REACT_APP_API_URL;
function MyLog({ selectedPostUno }) {
    const [value, setValue] = useState(new Date());
    const [year, setYear] = useState(value.getFullYear());
    const [month, setMonth] = useState(value.getMonth() + 1);
    const [result, setResult] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState({});
    const {uno,nickname,uid,role} = jwt(localStorage.getItem('accessToken'));


    const displayMonth = String(month).padStart(2, '0'); // 월을 두 자리 숫자로 만듦
    const displayDate = `${year}-${displayMonth}`; // yyyy-mm 형식으로 조합

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (uno) {
            if (selectedPostUno) {
                const params = {
                    uno: selectedPostUno,
                    date: displayDate,
                };
                fetchData(params);
            } else {
                const params = {
                    uno: uno,
                    date: displayDate,
                };
                fetchData(params);
            }
        }
    }, [displayDate, uno, selectedPostUno]);

    useEffect(() => {
        setYear(value.getFullYear());
        setMonth(value.getMonth() + 1);
        setSelectedDate(new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1).toISOString().slice(0, 10));
        setCurrentPage(1); // 페이지를 1로 초기화
    }, [value]);

    const fetchData = async (params) => {
        try {
            const response = await axios.get(`${API_URL}/log/getlist`, { params });
            const data = response.data;

            const newResult = {};

            data.forEach((item) => {
                const datetimeString = item.regDate;
                const dateObj = new Date(datetimeString);
                const dateString = dateObj.toISOString().slice(0, 10);

                if (!newResult[dateString]) {
                    newResult[dateString] = [];
                }
                newResult[dateString].push({
                    title: item.ptitle,
                    nickname: item.punickname,
                    status: item.lsname,
                });
            });
            setResult(newResult);
        } catch (error) {
            console.error(error);
            setResult({});
        }
    };

    const tileContent = ({ date, view }) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const dateStr = new Date(year, month, day + 1).toISOString().slice(0, 10);
        if (view === 'month' && result[dateStr]) {
            return <div className="dot"></div>;
        }
        return null;
    };

    const onChange = (newValue) => {
        setValue(newValue);
        setYear(newValue.getFullYear());
        setMonth(newValue.getMonth() + 1);
        setSelectedDate(new Date(value.getFullYear(), value.getMonth(), value.getDate()+1).toISOString().slice(0, 10));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        const totalPages = Math.ceil(result[selectedDate].length / 5); // 페이지당 5개의 행
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = (currentPage - 1) * 5; // 페이지당 5개의 행
    const endIndex = startIndex + 5;
    const selectedData = Array.isArray(result[selectedDate]) ? result[selectedDate].slice(startIndex, endIndex) : [];

    return (
        <>
            <div className="Calender-Header">
                <Calendar onChange={onChange} value={value} calendarType="US" tileContent={tileContent} locale="ko-KR" />
                {/* 데이터 테이블 */}
                <div className="Calender-info">
                    <p className="Calender-Title">{value.toLocaleDateString()}의 활동</p>
                    {Array.isArray(selectedData) && selectedData.length > 0 ? (
                        <table className="Calender-table">
                            <thead className="Calender-thead">
                            <tr>
                                <th>제목</th>
                                <th>닉네임</th>
                                <th>상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.nickname}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="Calender-data">해당 날짜에 데이터가 없습니다.</p>
                    )}
                    {result[selectedDate] && result[selectedDate].length > 5 && ( // 페이지당 5개 이상의 행이 있는 경우에만 페이징 버튼을 표시  //페이징 기능 추가
                        <div className="pagination">
                            <button onClick={goToPreviousPage} disabled={currentPage === 1} className='backButton'>
                                이전 페이지
                            </button>
                            <span className='nowPage'>{currentPage}</span>
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === Math.ceil(result[selectedDate].length / 5)} className='frontButton'
                            >
                                다음 페이지
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* 데이터 테이블 */}
        </>
    );
}

export default MyLog;