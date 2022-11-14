import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";
import { selectUsers } from "../../redux/reducers/usersSlice";
import { isEmpty } from "../../utils/utils";

const CardComments = ({ posts }) => {

    const [text, setText] = useState(null)
    const { users } = useSelector(selectUsers); 
    const { user } = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleComment = () => {

    }

    return (
        <div className="comments-container">
            {posts.comments.map((comment) => {
                return (
                    <div className={comment.commenterId === user._id ? 
                        "comment-container client" : "comment-container"} 
                        key={comment._id}
                    >
                        <div className="left-part">
                            <img src={!isEmpty(users[0]) && users.map((user) => {
                                if(user._id === comment.commenterId) return user.picture;
                            })} alt="poster-pic" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CardComments;