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
import LikeButton from "../LikeButton/LikeButton";

const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true)
    const { users } = useSelector(selectUsers); 
    const { user } = useSelector(selectUser); 

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
                            users.map((elt) => {
                                if (elt._id === post.posterId) return elt.picture
                            }).join("")
                        } alt="poster-pic" />
                    </div>        
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {users.map((elt) => {
                                        if (elt._id === post.posterId) return elt.pseudo
                                    })}
                                </h3>
                                {post.posterID !== user._id &&
                                    <FollowHandler idToFollow={post.posterId} type="card" />                                
                                }
                            </div>
                            <span>{dateParser(post.createdAt)}</span>        
                        </div>
                        <p>{post.message}</p>
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