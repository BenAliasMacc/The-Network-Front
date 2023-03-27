import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/userSlice';
import { selectUsers } from '../../redux/reducers/usersSlice';
import { isEmpty } from '../../utils/utils';
import FollowHandler from '../FollowHandler/FollowHandler';
import requests from '../../api/requests';

const FriendsHint = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([]);
    const { user } = useSelector(selectUser); 
    const { users } = useSelector(selectUsers); 

    useEffect(() => {
        const notFriendList = () => {
            let array = [];
            users.map((elt) => {
                if (user._id !== elt._id && !elt.followers.includes(user._id)) {
                    return array.push(elt._id);
                } return null;
            });
            array.sort(() => 0.5 - Math.random());
            if (window.innerHeight > 780) {
                array.length = 5;
            } else if (window.innerHeight > 720) {
                array.length = 4;
            } else if (window.innerHeight > 615) {
                array.length = 3;
            } else if (window.innerHeight > 540) {
                array.length = 1;
            } else {
                array.length = 0;
            }
            setFriendsHint(array);
        };

        if (playOnce && !isEmpty(users[0]) && !isEmpty(user._id)) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [users, user, playOnce])
    

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
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
                <ul>
                    {friendsHint && friendsHint.map((elt) => {
                        for (let i = 0; i < users.length; i++) {
                            if (elt === users[i]._id) {
                                return (
                                    <li className="user-hint" key={elt}>
                                        <img src={requests.baseURL + users[i].picture.slice(1)} alt="user-pic" />
                                        <p>{users[i].pseudo}</p>
                                        <FollowHandler idToFollow={users[i]._id} type={"suggestion"} />
                                    </li>
                                )
                            }
                        } return null;
                    })}
                </ul>
            )

            }
        </div>
    )
};

export default FriendsHint;