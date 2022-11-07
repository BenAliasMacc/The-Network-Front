import LeftNav from "../../components/LeftNav/LeftNav";
import Thread from "../../components/Thread/Thread";

const Home = () => {
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Thread />
            </div>
        </div>
    );
};

export default Home;