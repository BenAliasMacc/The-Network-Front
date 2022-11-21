import { useContext } from "react";
import { AuthContext } from "../../context/AppContext";
import LeftNav from "../../components/LeftNav/LeftNav";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import Thread from "../../components/Thread/Thread";
import Log from "../../components/Log/Log";
import Trends from "../../components/Trends/Trends";
import FriendsHint from "../../components/FriendsHint/FriendsHint";

const Home = () => {

    const userId = useContext(AuthContext);

    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {userId ? <NewPostForm /> : <Log signin={true} signup={false} />}
                </div>
                <Thread />
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <div className="wrapper">
                        <Trends />
                        {userId && <FriendsHint />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;