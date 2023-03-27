import axios from 'axios';
import { useDispatch } from 'react-redux';
import trash from "../../assets/icons/trash.svg";
import { deletePost } from '../../redux/reducers/postSlice';
import requests from '../../api/requests';

const DeleteCard = ({ id }) => {

    const dispatch = useDispatch();

    const deleteCard = async () => {
        try {
            await axios.delete(`${requests.post}/${id}`);
        } catch (error) {
            console.log(error);
        }
        dispatch(deletePost({id}));
    }

    const handleDelete = () => {
        if (window.confirm('Souhaitez-vous supprimer cet article ?')) {
            deleteCard();
        }
    }

    return (
        <div onClick={handleDelete} >
            <img src={trash} alt="trash" />
        </div>
    )
}

export default DeleteCard;