import { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AppContext";
import LeftNav from "../../components/LeftNav/LeftNav";
import Card from "../../components/Card/Card";
import { isEmpty } from "../../utils/utils";
import Trends from "../../components/Trends/Trends";
import FriendsHint from "../../components/FriendsHint/FriendsHint";

const Trending = () => {

    const userId = useContext(AuthContext);
    const trends = useSelector((state) => state.trendsSlice.trends);

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
}

export default Trending