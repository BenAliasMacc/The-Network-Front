import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AppContext";
import LeftNav from "../../components/LeftNav/LeftNav";
import Card from "../../components/Card/Card";
import { isEmpty } from "../../utils/utils";
import Trends from "../../components/Trends/Trends";
import FriendsHint from "../../components/FriendsHint/FriendsHint";
import { getTrends } from "../../redux/reducers/trendsSlice";
import { fetchPost, selectPost } from "../../redux/reducers/postSlice";

const Trending = () => {

    const userId = useContext(AuthContext);
    const { posts } = useSelector(selectPost);
    const trends = useSelector((state) => state.trendsSlice.trends);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPost())
    }, []);

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
        <div className="trending-page">
            <LeftNav />
            <div className="main">
                <ul>
                    {!isEmpty(trends[0]) && trends.map((post) => <Card post={post} key={post._id} />)}
                </ul>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                    {userId && <FriendsHint />}
                </div>
            </div>
        </div>
    )
};

export default Trending;