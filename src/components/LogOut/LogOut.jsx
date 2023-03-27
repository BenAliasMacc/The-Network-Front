import axios from "axios";
import cookie from "js-cookie";
import logoutIcon from "../../assets/icons/logout.svg";
import requests from "../../api/requests";

const Logout = () => {
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };
  
    const handleLogout = async () => {
      await axios({
        method: "get",
        url: requests.logout,        
      })
        .then(() => removeCookie("jwt"))
        .catch((err) => console.log(err));
      
      window.location = "/";
    };

    return (
        <li onClick={handleLogout}>
            <img src={logoutIcon} alt="logout" />
        </li>
    )
}

export default Logout;