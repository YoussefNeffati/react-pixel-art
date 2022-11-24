import React from 'react';
import { Link } from "react-router-dom";
import "../styles/navbar.scss"; 

const Navbar = () => (
    <header className='navbar'>
        <Link className="navbar__title navbar__item" to="/">PixelArt</Link>
        <Link className="navbar__item" to="/">Accueil</Link>
        <Link className="navbar__item" to="/login">Se connecter</Link>
              
    </header>
);

export default Navbar;