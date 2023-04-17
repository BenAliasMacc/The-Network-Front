import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../redux/reducers/usersSlice';
import {ThreeCircles } from "react-loader-spinner";
import { useEffect } from "react";
import { dateParser, isEmpty } from "../../utils/utils";
import { selectUser } from "../../redux/reducers/userSlice";
import { updatePost } from "../../redux/reducers/postSlice";
import FollowHandler from "../FollowHandler/FollowHandler";
import commentIcon from "../../assets/icons/message1.svg";
import shareIcon from "../../assets/icons/share.svg";
import editButton from "../../assets/icons/edit.svg";
import LikeButton from "../LikeButton/LikeButton";
import axios from "axios";
import DeleteCard from "../DeleteCard/DeleteCard";
import CardComments from "../CardComments/CardComments";
import requests from "../../api/requests";

const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const { users } = useSelector(selectUsers); 
    const { user } = useSelector(selectUser);
    const postPicture = requests.baseURL + post.picture.slice(1);
    const dispatch = useDispatch();

    const handleUpdatePost = async () => {
        const newPost = {
            ...post,
            message: textUpdate
        };

        try {
            await axios.put(`${requests.post}/${post._id}`, newPost)
        } catch (error) {
            console.log(error);
        }
        setIsUpdated(false);
        dispatch(updatePost({postId: post._id, message: textUpdate}));
    };

    useEffect(() => {
      !isEmpty(users[0]) && setIsLoading(false)
    }, [users]);   

    return (
        <li className="card-container">
            {isLoading ? (
                <div className="loader">
                    <ThreeCircles 
                        height="50"
                        width="50"
                        color="#ff7b77"
                        ariaLabel="three-circles-rotating"
                        outerCircleColor="#ff7b77"
                        innerCircleColor="#ffd0c4"
                        middleCircleColor="#ff7b77"
                    /> 
                </div>
            ) : (
                <>
                    <div className="card-left" >
                        <img src={
                            !isEmpty(users[0]) && users.map((user) => {
                                if (user._id === post.posterId) return requests.baseURL + user.picture.slice(1);
                                else return null;
                            }).join("")
                        } alt="poster-pic" />
                    </div>        
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(users[0]) && users.map((elt) => {
                                        if (elt._id === post.posterId) return elt.pseudo;
                                        else return null;
                                    })}
                                </h3>
                                {post.posterId !== user._id &&
                                    <FollowHandler idToFollow={post.posterId} type="card" />                                
                                }
                            </div>
                            <span>{dateParser(post.createdAt)}</span>        
                        </div>
                        {isUpdated ? (
                            <div className="update-post">
                                <textarea 
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <div className="button-container">
                                    <button className="btn" onClick={handleUpdatePost}>
                                        Valider Modification
                                    </button>
                                </div>
                            </div>
                        ):
                            <p>{post.message}</p>
                        }
                        {post.picture && <img src={postPicture} alt="card-pic" className="card-pic" /> }
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope, picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>                            
                        )}
                        {user._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)} >
                                    <img src={editButton} alt="edit" />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img onClick={() => setShowComments(!showComments)} src={commentIcon} alt="comment" />
                                <span>{post.comments ? post.comments.length : "0"}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src={shareIcon} alt="share" />
                        </div>
                        {showComments && <CardComments post={post} />}                     
                    </div>
                </>
            )
        }
        </li>
    );
};

export default Card;