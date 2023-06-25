import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageModal from "../modal/PageModal";

const API_URL = process.env.REACT_APP_API_URL;

const ReportPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [clickedPostId, setClickedPostId] = useState(null);
    const [data, setData] = useState({});
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    };

    const pnoClick = (postId) => {
        setSelectedPostId(postId);
        setClickedPostId(postId);
        setShowPopup(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/log/getreportlist`, config);
                setData(response.data.content);
                console.log(response.data.content);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchData();
    }, []);

    // const onDeleteClick = async (postNum) => {
    //     const ok = window.confirm("구름을 삭제할까요?");
    //
    //     if (ok === true) {
    //         const response = await axios.delete(`${API_URL}/post/delete/${postNum}`,{
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    //             }});
    //     }
    // };


    return (
        <>
            <div>
                {Array.isArray(data) && data.map((item) => (
                    <div style={{ borderBottom:"1px solid #ebebeb"}}>
                    <div key={item.lno}  onClick={() => pnoClick(item.pno)}  >
                        <div className='alarm-content' style={{height:"50px"}}>
                            <p>{new Date(item.regDate).toLocaleDateString()}</p>
                            {item.ptitle}게시글을  {item.unickname}님에게 {item.lsname}를 받았습니다.
                        </div>
                    </div>
                        <button  onClick={onDeleteClick(item.pno)} >삭제</button>
                    </div>
                ))}
                <div>
                </div>
            </div>
            <PageModal
                showPopup={showPopup && selectedPostId === clickedPostId}
                setShowPopup={setShowPopup}
                postId={showPopup && selectedPostId === clickedPostId ? clickedPostId : null}

            />
        </>
    );
};
export default ReportPage;