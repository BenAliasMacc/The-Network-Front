import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import heart from '../../assets/icons/heart.svg';
import heartFilled from '../../assets/icons/heart-filled.svg';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { likePost } from '../../redux/reducers/postSlice';

const LikeButton = ({ post }) => {

    const [liked, setLiked] = useState(false);
    const userId = useContext(AuthContext);
    const dispatch = useDispatch();
    console.log(post);

    useEffect(() => {
        post.likers.includes(userId) && setLiked(true)
    }, [userId, post.likers, liked]);
    
    const handleLike = () => {
        console.log(userId);
        try {
            axios.patch(`/api/post/like-post/${post._id}`, { id: userId, postId: post._id });
            dispatch(likePost({postId: post._id, userId}));
            setLiked(true);
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="like-container">
            {userId === null && 
                <Popup 
                    trigger={<img src={heart} alt="like" /> } 
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>
            }
            {userId && liked === false && (
                <img src={heart} alt="like" onClick={handleLike} />
            )}
            {userId && liked && (
                <img src={heartFilled} alt="like" onClick={handleLike} />
            )}
        </div>
    );
};

export default LikeButton;