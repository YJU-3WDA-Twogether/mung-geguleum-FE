import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoCloseSharp, IoImageOutline } from "react-icons/io5";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { Carousel } from "react-responsive-carousel";
import pfile from "../image/Profile.jpg";
import RemakeTegModal from "../modal/RemakeTegModal";
import styled from "../styles/PostCreate.module.css";
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL;

// 작성후 초기화 시키기
const PostRemakeCreate = ({setNewPosts}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState({});
    const [selectedPosts, setSelectedPosts] = useState([]);
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    };

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        fileList: [],
        audioList: [],
        videoList: [],
    });
    const [category, setCategory] = useState();
    const [remakeTag, setRemakeTag] = useState(null);
    const {uno,nickname,uid,role,fpath} = jwt(localStorage.getItem('accessToken'));
    const [selectedFile, setSelectedFile] = useState([]);


    const MAX_FILE_SIZE = 1000 * 1024 * 1024; // 200MB
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const extension = file.name.split('.').pop();
            const fileType = (() => {
                switch (extension) {
                    case 'png':
                    case 'jpg':
                    case 'jpeg':
                    case 'gif':
                    case 'PNG':
                    case 'JPG':
                    case 'JPEG':
                    case 'GIF':
                        return 'fileList';
                    case 'mp3':
                    case 'wav':
                    case 'ogg':
                    case 'MP3':
                    case 'WAV':
                    case 'OGG':
                        return 'audioList';
                    case 'mp4':
                    case 'avi':
                    case 'mkv':
                    case 'MP4':
                    case 'AVI':
                    case 'MKV':
                        return 'videoList';
                    default:
                        return null;
                }
            })();

            if (fileType === null) {
                alert('지원하지 않는 파일 형식입니다.');
            } else if (formData[fileType].reduce((acc, {file}) => acc + file.size, 0) + file.size > MAX_FILE_SIZE) {
                alert(`파일 크기는 ${MAX_FILE_SIZE / 1024 / 1024}MB 이내로 업로드할 수 있습니다.`);
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [fileType]: [...prevState[fileType], {file}],
                }));
                setSelectedFile((prevFiles) => [...prevFiles, file]);
            }
        });
    }

    const handleFileDelete = (type, index) => {
        let newFiles;
        if (type === 'image') {
            newFiles = [...formData.fileList];
            newFiles.splice(index, 1);
            setFormData(prevState => ({
                ...prevState,
                fileList: newFiles,
            }));
        } else if (type === 'audio') {
            newFiles = [...formData.audioList];
            newFiles.splice(index, 1);
            setFormData(prevState => ({
                ...prevState,
                audioList: newFiles,
            }));
        } else if (type === 'video') {
            newFiles = [...formData.videoList];
            newFiles.splice(index, 1);
            setFormData(prevState => ({
                ...prevState,
                videoList: newFiles,
            }));
        }
        setSelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSelectPost = (item) => {
        const updatedSelectedPosts = selectedPosts.includes(item)
            ? selectedPosts.filter((selectedItem) => selectedItem !== item)
            : [...selectedPosts, item];
        setSelectedPosts(updatedSelectedPosts);
    };

    // 재창작 태그를 선택하는 버튼 클릭시 모달 창 열기
    const handleRemakeTagClick = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleSelectPosts = (posts) => {
        console.log(posts); // 선택된 데이터를 콘솔에 출력
        setRemakeTag(posts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            try {
                const response = await axios.get(`${API_URL}/s3/url`, {
                    params: { size: selectedFile.length },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                const preSignedUrl = response.data.preSignedUrl;
                const encodedFileName =  response.data.encodedFileName;
                console.log(encodedFileName)
                await Promise.all(selectedFile.map(async (file, i) => {
                    try {
                        data.append('file', encodedFileName[i]+"."+file.name.split('.').pop());
                        console.log(encodedFileName[i]);
                        console.log(file.type);
                        await axios.put(preSignedUrl[i], file, {
                            headers: {
                                'Content-Type': file.type
                            }
                        });
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }
                }));
            } catch (error) {
                console.error('Error uploading file:', error);
            }

            data.append('title', formData.title);
            data.append('content', formData.content);
            data.append('bno', 4);

            if (remakeTag) {
                remakeTag.forEach(tag => {
                    data.append('tag', tag.lno);
                    console.log(tag.lno)
                });
            }


            const response = await axios.post(`${API_URL}/post/create`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            alert('게시글이 성공적으로 작성되었습니다.');
            setFormData({
                title: '',
                content: '',
                fileList: [],
                audioList: [],
                videoList: [],
            });
            setSelectedFile([]) ;
            setNewPosts(true);
        } catch (error) {
            console.error(error);
            alert('게시글 작성 중 오류가 발생했습니다.');
        }
    };
    const [select, setSelect] = useState("");

    return (
        <>
            <div
                className={`${styled.factoryForm} ${styled.modalBorder}`}
            >
                <div className={styled.factoryInput__container}>
                    <div className={styled.nweet__profile}>
                        <img
                            src={fpath} /* 이미지 주소 추가 */
                            alt="profileImg"
                            className={styled.profile__image}
                        />
                    </div>
                    <form  className={styled.factoryInput} onSubmit={handleSubmit} encType="multipart/form-data">
                        <div
                            className={`${styled.factoryForm__content} ${
                                select === "text" && styled.focus
                            }`}
                        >
                            <input
                                spellCheck="false"
                                className={styled.factoryInput__title}
                                type="text"
                                name="title"
                                placeholder="제목"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                            <textarea
                                spellCheck="false"
                                className={styled.factoryInput__input}
                                name="content"
                                placeholder="어떤걸 창작 하셨나요?"
                                value={formData.content}
                                onFocus={() => setSelect("text")}
                                onBlur={() => setSelect("")}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                maxLength={280}
                            ></textarea>
                            {
                                (formData.fileList.length > 0 || formData.audioList.length > 0 || formData.videoList.length > 0) &&
                                <div className={styled.factoryForm__attachment}>
                                    <div className={styled.factoryForm__Image} >
                                        <Carousel showThumbs={false}>
                                            {
                                                [
                                                    ...formData.fileList.map((file, index) => ({ type: 'image', file, index })),
                                                    ...formData.audioList.map((file, index) => ({ type: 'audio', file, index })),
                                                    ...formData.videoList.map((file, index) => ({ type: 'video', file, index })),
                                                ].map(({ type, file, index }) => (
                                                    <div key={index} className={styled.factoryForm__mediaContainer} style={{marginBottom : 5}}>
                                                        {type === 'image' && <img src={URL.createObjectURL(file.file)} />}
                                                        {type === 'audio' && <audio src={URL.createObjectURL(file.file)} controls />}
                                                        {type === 'video' && <video src={URL.createObjectURL(file.file)} controls />}
                                                        <div
                                                            className={styled.factoryForm__clear}
                                                            onClick={() => handleFileDelete(type, index)}>
                                                            <IoCloseSharp />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styled.factoryInput__add}>
                            <div className={styled.factoryInput__iconBox}>
                                <label
                                    htmlFor="attach-file"
                                    className={styled.factoryInput__label}
                                >
                                    <div className={styled.factoryInput__icon}
                                    >
                                        <IoImageOutline />
                                    </div>
                                </label>
                                <input
                                    id="attach-file" type="file" accept="image/*, audio/*, video/*" onChange={handleFileChange}
                                />
                            </div>
                            <div className={styled.factoryInput__iconBox}>
                                <div
                                    className={`${styled.factoryInput__icon} ${styled.emoji__icon}` } onClick={handleRemakeTagClick}
                                >
                                    <VscGitPullRequestCreate />
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="작성하기"
                                className={styled.factoryInput__arrow}
                                disabled={formData.content === "" || formData.title === ""}
                            />
                        </div>
                    </form>

                </div>
            </div>
            {/* 재창작 태그 선택 버튼 */}

            {/* ... */}
            <RemakeTegModal
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                onSelectPost={handleSelectPost}
                onSelectPosts={handleSelectPosts}
                selectedPosts={selectedPosts}
            />

        </>
    );
};

export default PostRemakeCreate;