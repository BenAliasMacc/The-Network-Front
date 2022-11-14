import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, selectUser } from '../../redux/reducers/userSlice';
import { selectUsers } from '../../redux/reducers/usersSlice';
import { dateParser } from '../../utils/utils';
import LeftNav from '../LeftNav/LeftNav';
import UploadImg from '../UploadImg/UploadImg';
import FollowHandler from '../FollowHandler/FollowHandler';

const UpdateProfil = () => {

    const { user } = useSelector(selectUser); 
    const { users } = useSelector(selectUsers); 
    const [updateForm, setUpdateForm] = useState(false); 
    const [bio, setBio] = useState(user.bio);  
    const [pseudo, setPseudo] = useState(user.pseudo);  
    const [email, setEmail] = useState(user.email);    
    // const [password, setPassword] = useState(user.password);  
    const [followingModal, setFollowingModal] = useState(false);
    const [followersModal, setFollowersModal] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updateUser = {
            ...user,
            bio,
            pseudo,
            email,
        }
        try {
            const res = await axios.put(`/api/user/${user._id}`, updateUser)
            dispatch(editUser(res.data));
            setUpdateForm(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        
        <div className='updateProfil'>
            <LeftNav />
            <h1>Profil de {user.pseudo}</h1>
            <div className="updateProfil-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={user.picture} alt="user-pic" />
                    <UploadImg />
                </div>
                <div className="right-part">
                    <div className='bio-update'>
                        <h3>Utilisateur</h3>
                        {updateForm ? (
                            <form onSubmit={handleSubmit} >
                                <textarea defaultValue={user.bio} onChange={(e) => setBio(e.target.value)} />
                                <input type="text" defaultValue={user.pseudo} onChange={(e) => setPseudo(e.target.value)} />
                                <input type="email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
                                {/* <input type="password" defaultValue={user.password} onChange={(e) => setPassword(e.target.value)} /> */}
                                <button type='submit'>Valider modification</button>            
                            </form>
                        ) : (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)} className="bio" >{user.bio}</p>
                                <p onClick={() => setUpdateForm(!updateForm)}>{user.pseudo}</p>
                                <p onClick={() => setUpdateForm(!updateForm)}>{user.email}</p>
                                {/* <p onClick={() => setUpdateForm(!updateForm)}>**********</p> */}
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier</button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le {dateParser(user.createdAt)}</h4>
                    <h5 onClick={() => setFollowingModal(true)}>Abonnements : {user.following ? user.following.length : 0}</h5>
                    <h5 onClick={() => setFollowersModal(true)}>Abonnés : {user.followers ? user.followers.length : 0}</h5>
                </div>                
            </div>
            {followingModal && 
                <div className="modal-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className='cross' onClick={() => setFollowingModal(false)}>&#10005;</span>
                        <ul>
                            {users.map((elt) => {                                
                                for (let i = 0; i < user.following.length; i++) {
                                    if (elt._id === user.following[i]) {
                                        return (
                                            <li key={uuid()}>
                                                <img src={elt.picture} alt="user-pic" />
                                                <h4>{elt.pseudo}</h4>
                                                <FollowHandler idToFollow={elt._id} type="suggestion" />
                                            </li>
                                        )
                                    }                               
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            }
            {followersModal && 
                <div className="modal-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className='cross' onClick={() => setFollowersModal(false)}>&#10005;</span>
                        <ul>
                            {users.map((elt) => {
                                for (let i = 0; i < user.followers.length; i++) {
                                    if (elt._id === user.followers[i]) {
                                        return (
                                            <li key={uuid()}>
                                                <img src={elt.picture} alt="user-pic" />
                                                <h4>{elt.pseudo}</h4>
                                                <FollowHandler idToFollow={elt._id} type="suggestion" />
                                            </li>
                                        )
                                    }                                    
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default UpdateProfil