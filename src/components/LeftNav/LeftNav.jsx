import React from 'react'
import { NavLink } from 'react-router-dom';
import home from '../../assets/icons/home.svg';
import rocket from '../../assets/icons/rocket.svg';
import user from '../../assets/icons/user.svg';

const LeftNav = () => {

  return (
    <div className="leftNav">
        <div className="icons">
            <div className="icons-bis">
                <NavLink to='/' className={({ isActive }) => isActive ? "active-left-nav" : ""} end>
                    <img src={home} alt='home' />
                </NavLink>
                <NavLink to='/trending' className={({ isActive }) => isActive ? "active-left-nav" : ""} >
                    <img src={rocket} alt='rocket' />
                </NavLink>
                <NavLink to='/profil' className={({ isActive }) => isActive ? "active-left-nav" : ""} >
                    <img src={user} alt='user' />
                </NavLink>
            </div>
        </div>
    </div>
  )
};

export default LeftNav;