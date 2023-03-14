import axios from "axios";
import { useState } from "react"
import SignIn from "../../components/SignIn/SignIn";
import requests from "../../api/requests";

const SignUp = () => {

    const [registered, setRegistered] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [pseudoError, setPseudoError] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [controlPassword, setControlPassword] = useState("");
    const [controlPasswordError, setControlPasswordError] = useState(null);
    const [terms, setTerms] = useState(false);
    const [termsError, setTermsError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setControlPasswordError(null);
        setTermsError(null);
        if (password !== controlPassword) return setControlPasswordError("Les mots de passe sont différents");
        if (!terms) return setTermsError("Les conditions générales doivent être validé");

        try {
            await axios.post(requests.createUser, {
                withCredentials: true,
                pseudo,
                email,
                password,
            });
            setRegistered(true);
        } catch (error) {
            console.log(error);
            setPseudoError(error.response.data.errors.pseudo);
            setEmailError(error.response.data.errors.email);
            setPasswordError(error.response.data.errors.password);                
        }        
        
    };

    return (
        <>
            {registered ? (
                <>
                    <SignIn />
                    <h4 className="success">
                        Enregistrement réussi, veuillez-vous connecter
                    </h4>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="pseudo" >Pseudo</label>
                    <input 
                        type="text" 
                        id="pseudo" 
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="password error">{pseudoError}</div>
                    <label htmlFor="email" >Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        />
                    <div className="password error">{emailError}</div>
                    <label htmlFor="password" >Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                    <div className="password error">{passwordError}</div>
                    <label htmlFor="controlPassword" >Confirmer le mot de passe</label>
                    <input 
                        type="password" 
                        id="controlPassword" 
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    />
                    <div className="controlPassword error">{controlPasswordError}</div>            
                    <div className="terms">
                        <input type="checkbox" id="terms" onChange={(e) => setTerms(e.target.checked)} />
                        <label htmlFor="terms" >J'accepte <a href="/">les condition générales</a></label>
                        <div className="terms error">{termsError}</div>
                    </div>
                    <input type="submit" value="Envoyer" />
                </form>
            )}        
        </>
    )
}

export default SignUp