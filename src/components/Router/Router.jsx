import { Routes, Route } from "react-router-dom"
import Home from "../../pages/Home/Home"
import Profil from "../../pages/Profil/Profil"
import Trending from "../../pages/Trending/Trending"
import Navbar from "../Navbar/Navbar"

const Router = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profil' element={<Profil />} />
                <Route path='/trending' element={<Trending />} />
                <Route path='*' element={<Home />} />
            </Routes>        
        </>
    )
}

export default Router;