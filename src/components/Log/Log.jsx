import { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SignIn";

const Log = ({ signUpStatus, signInStatus }) => {

    const [signUpModal, setSignUpModal] = useState(signUpStatus);
    const [signInModal, setSignInModal] = useState(signInStatus);

    const handleModals = (e) => {
        switch (e.target.id) {
            case "signUp":
                setSignUpModal(true);
                setSignInModal(false);
                break;
            case "signIn":
                setSignUpModal(false);
                setSignInModal(true);
                break;
            default:
                break;
        }
    };

    return (
        <div className="log">
            <div className="log-container">
                <ul>
                    <li onClick={handleModals} id="signUp" className={signUpModal ? "active-btn" : null} >S'inscrire</li>
                    <li onClick={handleModals} id="signIn" className={signInModal ? "active-btn" : null} >Se connecter</li>
                </ul>
                {signUpModal &&  <SignUp />}
                {signInModal && <SignIn />}
            </div>
        </div>
    )
};

export default Log;