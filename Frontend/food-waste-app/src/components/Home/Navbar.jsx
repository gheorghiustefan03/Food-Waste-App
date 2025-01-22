import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Food Waste App</h1>
            </div>
                <div className="navbar-user">
                    <span className="navbar-logout">Log out</span>
                    <span className="navbar-username">Username</span>
                </div>
        </nav>
    );
};

export default Navbar;