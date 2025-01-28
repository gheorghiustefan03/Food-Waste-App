import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from "axios";

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUserFoods = async () => {
        try {
            const userResponse = await axios.get(`${import.meta.env.VITE_API_HOST}/api/user/getLoggedInUser`, {withCredentials: true});
            setUser(userResponse.data);
        } catch (err) {
          console.error(err);
          navigate('/login');
        }
      };
  
      fetchUserFoods();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get("https://food-waste-app-api.azurewebsites.net/api/user/logout", {withCredentials: true});
        navigate('/login');
    };

    if(!user)
        return null;    

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Food Waste App</h1>
            </div>
            <div className="navbar-user">
                <span className="navbar-logout" onClick={handleLogout}>Log out</span>
                {<span className="navbar-username">{user.user.firstName} {user.user.lastName}</span>}
            </div>
        </nav>
    );
};

export default Navbar;
