import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/userSlice';
import {ThreeCircles } from "react-loader-spinner";
import { useEffect } from 'react';
import { dateParser, isEmpty } from '../../utils/utils';
import { Link } from 'react-router-dom';
import pictureIcon from '../../assets/icons/picture.svg';
import axios from 'axios';
import requests from "../../api/requests";
import { fetchPost } from '../../redux/reducers/postSlice';

const NewPostForm = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const { user } = useSelector(selectUser);
    const userPicture = !isEmpty(user) && requests.baseURL + user.picture.slice(1);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('posterId', user._id);
            data.append('message', message);
            if (file) data.append("file", file)
            data.append("video", video);

            console.log(data);
                
            await axios.post(requests.post, data, {withCredentials: true});
            dispatch(fetchPost());
            cancelPost();            
        } else {
            alert("Veuillez entrer un message")
        }
    };

    const handlePicture = (e) => {  
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo("");
    };

    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setVideo("");
        setFile("");
    };

    useEffect(() => {
        if (!isEmpty(user)) setIsLoading(false);
        
        const handleVideo = () => {
            let findLink = message.split (" ");
            for (let i = 0; i < findLink.length; i++) {
                if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
                    let embed = findLink[i].replace('watch?v=', 'embed/');
                    setVideo(embed.split('&')[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    setPostPicture("");
                };
            };
        };
        handleVideo();
    }, [user, message, video]);

    return (
        <div className="post-container">
            {isLoading ? (
                <ThreeCircles 
                    height="50"
                    width="50"
                    color="#ff7b77"
                    ariaLabel="three-circles-rotating"
                    outerCircleColor="#ff7b77"
                    innerCircleColor="#ffd0c4"
                    middleCircleColor="#ff7b77"
                /> 
            ) : (
                <>
                    <div className="data">
                        <p>
                            <span>{user.following ? user.following.length : 0}</span> Abonnement{user.following?.length > 1 ? "s" : null}
                        </p>
                        <p>
                            <span>{user.followers ? user.followers.length : 0}</span> Abonné{user.followers?.length > 1 ? "s" : null}
                        </p>
                    </div>
                    <Link to="/profil">
                        <div className="user-info">
                            <img src={userPicture} alt="user-img" />
                        </div>
                    </Link>
                    <form className="post-form" encType="multipart/form-data">
                        <textarea 
                            name='message' 
                            id='message' 
                            placeholder='Quoi de neuf ?' 
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postPicture || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userPicture} alt="user-pic" />
                                </div>
                                <div className="card-right">
                                    <div className="pseudo">
                                        <h3>{user.pseudo}</h3>
                                    </div>
                                    <span>{dateParser(Date.now())}</span>
                                </div>
                                <div className="content">
                                    <p>{message}</p>
                                    <img src={postPicture} alt="" />
                                    {video && (
                                        <iframe
                                            src={video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope, picture-in-picture"
                                            allowFullScreen      
                                            title={video}                             
                                        ></iframe>
                                    )}
                                </div>
                            </li>
                        ): null}
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>  
                                        <label htmlFor='file-upload'>
                                            <img src={pictureIcon} alt="img" />
                                        </label>
                                        <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => handlePicture(e)} style={{display: "none"}} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Suprimer vidéo</button>
                                )}
                            </div>
                            <div className="btn-send">
                                {message || postPicture || video.length > 20 ? (
                                    <button className='cancel' onClick={cancelPost}>Annuler Message</button>
                                ): null}
                                <button className="send" onClick={handleSubmit}>Envoyer</button>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
};

export default NewPostForm;