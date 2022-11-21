import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../redux/reducers/postSlice";
import { selectUser } from "../../redux/reducers/userSlice";
import { selectUsers } from "../../redux/reducers/usersSlice";
import { dateParser, isEmpty } from "../../utils/utils";
import EditDeleteComment from "../EditDeleteComment/EditDeleteComment";
import FollowHandler from "../FollowHandler/FollowHandler";

const CardComments = ({ post }) => {

    const [text, setText] = useState("")
    const { users } = useSelector(selectUsers); 
    const { user } = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleComment = async (e) => {
        e.preventDefault();
        if (text) {
            try {
                await axios.patch(`/api/post/comments/${post._id}`, {
                    commenterId: user._id,
                    commenterPseudo: user._pseudo,
                    text
                });
            } catch (error) {
                console.log(error);
            }            
            dispatch(fetchPost());
            setText("");
        }
    };
    
    return (
        <div className="comments">
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenterId === user._id ? 
                        "comment-container client" : "comment-container"} 
                        key={comment._id}
                    >
                        <div className="left-part">
                            <img src={
                                !isEmpty(users[0]) && users.map((elt) => {
                                    if(elt._id === comment.commenterId) return elt.picture;
                                    else return null;
                                }).join("")
                            } alt="commenter-pic" />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPseudo}</h3>
                                    {comment.commenterId !== user._id && <FollowHandler idToFollow={comment.commenterId} type={"card"} />}                                    
                                </div>
                                <span>{dateParser(comment.timeStamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>
                    </div>
                )
            })}
            {user._id && (
                <form onSubmit={handleComment} className="comment-form">
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="laisser un commentaire" />
                    <input type="submit" value="envoyer" />
                </form>
            )}
        </div>
    )
}

export default CardComments;