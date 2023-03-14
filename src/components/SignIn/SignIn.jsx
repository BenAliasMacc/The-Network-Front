import { useState } from "react";
import axios from "axios";
import requests from "../../api/requests";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(requests.logIn, 
                {
                    withCredentials: true,
                    email,
                    password
                }
            )
            setEmailError(null);
            setPasswordError(null);
            window.location.href = "/";
        } catch (error) {
            setEmailError(error.response.data.errors.email);
            setPasswordError(error.response.data.errors.password);
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />
            <div className="email error">{emailError}</div>
            <label htmlFor="password">Mot de passe</label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            <div className="password error">{passwordError}</div>
            <input type="submit" value="Se connecter" />
        </form>
    )
}

export default SignIn;