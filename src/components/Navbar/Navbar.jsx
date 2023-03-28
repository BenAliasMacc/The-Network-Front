import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icon.png";
import login from "../../assets/icons/login.svg";
import { AuthContext } from "../../context/AppContext";
import Logout from "../Logout/Logout";
import { useSelector } from 'react-redux';
import { selectUser } from "../../redux/reducers/userSlice";


const Navbar = () => {

    const { user } = useSelector(selectUser);
    const userId = useContext(AuthContext);  

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <Link>
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <h3>The Network</h3>
                        </div>
                    </Link>
                </div>
                {userId ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <Link to="/profil">
                                <h5>Bienvenue {user.pseudo}</h5>
                            </Link>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <Link to="/profil" >
                                <img src={login} alt="login" />
                            </Link>
                        </li>
                    </ul>
                )}
            </div>            
        </nav>
    )
};

export default Navbar;