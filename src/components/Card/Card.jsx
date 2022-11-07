import { useState } from "react";
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/reducers/usersSlice';
import {ThreeCircles } from "react-loader-spinner"
import { v4 as uuid } from 'uuid';
import { useEffect } from "react";
import { dateParser, isEmpty } from "../../utils/utils";
import { selectUser } from "../../redux/reducers/userSlice";
import FollowHandler from "../FollowHandler/FollowHandler";
import commentIcon from "../../assets/icons/message1.svg";
import shareIcon from "../../assets/icons/share.svg";
import editButton from "../../assets/icons/edit.svg";
import LikeButton from "../LikeButton/LikeButton";
import axios from "axios";


const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(post.message);
    const { users } = useSelector(selectUsers); 
    const { user } = useSelector(selectUser); 
    console.log(textUpdate);
    console.log(isLoading);

    const updatePost = async () => {
        const newPost = {
            ...post,
            message: textUpdate
        };

        try {
            await axios.put(`/api/post/${post._id}`, newPost)
        } catch (error) {
            
        }
    };

    useEffect(() => {
      !isEmpty(users[0]) && setIsLoading(false)
    }, [users]);   

    return (
        <li className="card-container" key={uuid()}>
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
                            !isEmpty(users[0]) && users.map((elt) => {
                                if (elt._id === post.posterId) return elt.picture;
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
                                    type="text"
                                    value={textUpdate}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <div className="button-container">
                                    <button className="btn" onClick={updatePost}>
                                        Valider Modification
                                    </button>
                                </div>
                            </div>
                        ):
                            <p>{post.message}</p>
                        }
                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" /> }
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
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src={commentIcon} alt="comment" />
                                <span>{post.comments ? post.comments.length : "0"}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src={shareIcon} alt="share" />
                        </div>                        
                    </div>
                </>
            )
        }
        </li>
    );
};

export default Card;