import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollow, removeFollow, selectUser } from "../../redux/reducers/userSlice";
import { isEmpty } from "../../utils/utils";
import checked from "../../assets/icons/checked.svg";
import check from "../../assets/icons/check.svg";

const FollowHandler = ({ idToFollow, type }) => {

    const { user } = useSelector(selectUser); 
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`/api/user/follow/${user._id}`, {idToFollow});
        dispatch(addFollow(idToFollow));
        setIsFollowed(true);
      } catch (error) {
        console.log(error);
      }
    };

    const handleUnfollow = async (e) => {
      e.preventDefault();
      const idToUnFollow = idToFollow;
      try {
        await axios.patch(`/api/user/unfollow/${user._id}`, {idToUnFollow});
        dispatch(removeFollow(idToUnFollow));
        setIsFollowed(false);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if(!isEmpty(user.following)) {
        if (user.following.includes(idToFollow)) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      }
    }, [user, idToFollow]);
    

    return (
        <div className="follow-handler">
          {isFollowed && !isEmpty(user) ? (           
            <span onClick={handleUnfollow} >
              {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}           
              {type === "card" && <img src={checked} alt="checked" /> }           
            </span> 
          ) :( 
            <span onClick={handleFollow} >
              {type === "suggestion" && <button className="follow-btn">Suivre</button>}
              {type === "card" && <img src={check} alt="check" /> }    
            </span>           
          )}
        </div>
    )
};

export default FollowHandler;