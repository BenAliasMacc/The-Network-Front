import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../redux/reducers/postSlice";
import { getTrends } from "../../redux/reducers/trendsSlice";
import { selectUsers } from "../../redux/reducers/usersSlice";
import { isEmpty } from '../../utils/utils';

const Trends = () => {

    const { posts } = useSelector(selectPost);
    const { users } = useSelector(selectUsers);
    const trends = useSelector((state) => state.trendsSlice.trends)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(posts[0])) {
            const postsArray = Object.keys(posts).map((i) => posts[i]);
            let sortedArray = postsArray.sort((a, b) => {
                return b.likers.length - a.likers.length;
            });
            sortedArray.length = 3;
            dispatch(getTrends(sortedArray));
        }
    }, [posts, dispatch])
    

    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <Link to="/trending" >
                <ul>
                    {trends.length && 
                        trends.map((post) => {
                            return (
                                <li key={post._id}>
                                    <div>
                                        {post.picture && <img src={post.picture} alt="post-pic" />}
                                        {post.video && (
                                            <iframe
                                                src={post.video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope, picture-in-picture"
                                                allowFullScreen      
                                                title={post._id}                             
                                            ></iframe>
                                        )}
                                        {isEmpty(post.picture) && isEmpty(post.video) && (
                                            <img src={users[0] && users.map((user) => {
                                                if (user._id === post.posterId) {
                                                    return user.picture;                                                    
                                                } return null;
                                            }).join("")} alt="profil-pic" />
                                        )}
                                    </div>
                                    <div className="trend-content">
                                        <p>{post.message}</p>
                                        <span>Lire</span>
                                    </div>
                                </li>
                            )
                        })}
                </ul>
            </Link>
        </div>
    )
}

export default Trends