import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "../../redux/reducers/userSlice";

const UploadImg = () => {

    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(selectUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const filename = Date.now() + user.pseudo;
        data.append("name", filename);
        data.append("userId", user._id);
        data.append("file", file);
        try {
            await axios.post(`/api/user/upload`, data);
            dispatch(fetchUser(user._id));
        } catch (error) {
            console.log(error);
        };        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="file">Changer d'image</label>
            <input type="file" name="file" id="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} style={{display: "none"}} />
            <input type="submit" value="Envoyer" />
        </form>
    )
};

export default UploadImg;