import axios from "axios";
import cookie from "js-cookie";
import logout from "../../assets/icons/logout.svg";

const LogOut = () => {

    const handleLogOut = async () => {
        const removeCookie = (elt) => {
            window !== "undefined" && cookie.remove(elt, { expires: 1 })
        }

        try {
            await axios.post('/api/user/logout', {
                withCredentials: true
            })
            removeCookie();
            window.location = '/profil';
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <li onClick={handleLogOut}>
            <img src={logout} alt="logout" />
        </li>
    )
}

export default LogOut