import { useContext } from "react";
import { AuthContext } from "../../context/AppContext";
import UpdateProfil from "../../components/UpdateProfil/UpdateProfil";
import Log from "../../components/Log/Log";
import logImg from "../../assets/log.svg";

const Profil = () => {

    const userId = useContext(AuthContext);

    return (
        <div className="profil">
            {userId ? (
                <UpdateProfil />
            ) : (
                <div className="profil-container">
                    <Log signInStatus={false} signUpStatus={true} />
                    <div className="profil-img">
                        <img src={logImg} alt="Illustration log" />
                    </div>
                </div>
            )}
        </div>
    )
};

export default Profil;