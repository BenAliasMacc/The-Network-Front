import { useContext, useState } from "react";
import { AuthContext } from "../../context/AppContext";
import editButton from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import { useEffect } from "react";
import axios from "axios";
import { fetchPost } from "../../redux/reducers/postSlice";
import { useDispatch } from "react-redux";
import requests from "../../api/requests";

const EditDeleteComment = ({ comment, postId }) => {

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const userId = useContext(AuthContext);
    const dispatch = useDispatch();

    const handleEdit = async (e) => {
        e.preventDefault();
        if (text) {
            console.log('test');
            await axios.patch(`${requests.editComment}/${postId}`, {
                commentId: comment._id,
                text
            });
            dispatch(fetchPost());
            setEdit(false);
        }
    };

    const deleteComment = async () => {
        try {
            await axios.patch(`${requests.deleteComment}/${postId}`, {
                commentId: comment._id,
            });
        } catch (error) {
            console.log(error);
        }
        dispatch(fetchPost());
    }

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Souhaitez-vous supprimer cet article ?')) {
            deleteComment();
        }
    };

    useEffect(() => {
        const checkAuthor = () => {
            if(userId === comment.commenterId) {
                setIsAuthor(true);
            }
        }
        checkAuthor();      
    }, [comment.commenterId, userId]);
    
    
    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src={editButton} alt="edit-comment" />
                </span>
            )}
            {isAuthor && edit && (
                <form onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor="text" onClick={() => setEdit(false)}>Editer</label>
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
                    <div className="btn">
                        <span onClick={handleDelete}><img src={trash} alt="delete" /></span>
                        <input type="submit" value="Valider modification" />
                    </div>
                </form>
            )}
        </div>
    )
};

export default EditDeleteComment;