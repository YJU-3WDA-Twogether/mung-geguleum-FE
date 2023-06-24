import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { IoCloseSharp, IoImageOutline } from "react-icons/io5";
import pfile from "../image/Profile.jpg";
import styled from "../styles/PostCreate.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";


const API_URL = process.env.REACT_APP_API_URL;

const PostCreate = ({pageNum, onPostSubmit,setNewPosts}) => {
    const carouselRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',    
        fileList: [],
        audioList: [],
        videoList: [],
    });
    const [user, setUser] = useState({});
    const [selectedFile, setSelectedFile] = useState([]);

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
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
            } else if (formData[fileType].reduce((acc, { file }) => acc + file.size, 0) + file.size > MAX_FILE_SIZE) {
                alert(`파일 크기는 ${MAX_FILE_SIZE / 1024 / 1024}MB 이내로 업로드할 수 있습니다.`);
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [fileType]: [...prevState[fileType], { file }],
                }));
                setSelectedFile((prevFiles) => [...prevFiles, file]);
            }
        });

        e.target.value = null;
    };

    useEffect(() => {
        console.log(selectedFile); // 업데이트된 값이 출력됨
    }, [selectedFile]);

    const handleFileDelete = (type, index) => {
        console.log("hi2")
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
            data.append('bno', pageNum);

            const hashtags = formData.content.match(/#[^\s#]*/g);
            if (hashtags) {
                data.append('hashtag',  hashtags.map(tag => tag.slice(1)));
            }
            console.log(data);
            const response = await axios.post(`${API_URL}/post/create`, data,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                }});

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
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = formData.fileList.length + formData.audioList.length + formData.videoList.length;

    const [select, setSelect] = useState("");
    return (
        <>
            <div
                className={`${styled.factoryForm} ${styled.modalBorder}`}
            >
                <div className={styled.factoryInput__container}>
                    <div className={styled.nweet__profile}>
                            <img
                                src={pfile} /* 이미지 주소 추가 */
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
                                placeholder="무슨 일이 일어나고 있나요?"
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
                                        <div style={{ position: 'relative' }}>
                                            <Carousel
                                                showStatus={false}
                                                showArrows={false}
                                                showThumbs={false}
                                                selectedItem={currentSlide}
                                                onChange={(index) => setCurrentSlide(index)}
                                            >
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
                                            <button
                                                type="button"
                                                onClick={() => setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides)}
                                                style={{
                                                    position: 'absolute',
                                                    left: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    backgroundColor: 'transparent', // 배경색을 투명하게
                                                    border: 'none', // 테두리를 없앰
                                                    color: '#6667ab', // 필요에 따라 아이콘 색상 조정
                                                    fontSize: '1.5rem' // 필요에 따라 아이콘 크기 조정
                                                }}
                                            >
                                                <IoIosArrowBack size={35}/>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setCurrentSlide((currentSlide + 1) % totalSlides)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    backgroundColor: 'transparent', // 배경색을 투명하게
                                                    border: 'none', // 테두리를 없앰
                                                    color: '#6667ab', // 필요에 따라 아이콘 색상 조정
                                                    fontSize: '1.5rem' // 필요에 따라 아이콘 크기 조정
                                                }}
                                            >
                                                <IoIosArrowForward  size={35}/>
                                            </button>
                                        </div>
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
                                    <div className={styled.factoryInput__icon}>
                                        <IoImageOutline />
                                    </div>
                                </label>
                                <input
                                    id="attach-file" type="file" accept="image/*, audio/*, video/*" onChange={handleFileChange} multiple
                                />
                            </div>
                            <input
                                type="submit"
                                value="작성하기"
                                className={styled.factoryInput__arrow}
                                disabled={formData.title === "" || formData.content === "" }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostCreate;
