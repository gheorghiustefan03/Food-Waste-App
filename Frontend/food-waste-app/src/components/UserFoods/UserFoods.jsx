import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './UserFoods.css';
import Navbar from '../Home/Navbar.jsx'

const UserFoods = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserFoods = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_API_HOST}/api/foodItem/getByUserId/${userId}`);
        setFoodItems(response.data);
        setUser(response.data);

      } catch (err) {
        console.error(err);
        setError("Failed to fetch user food items.");
      }
    };

    fetchUserFoods();
  }, [userId]);



  const handleBack = () => {
    navigate(-1);
  };

  const isExpiringSoon = (date) => {
    const today = new Date();
    const expiration = new Date(date);
    const diffInDays = (expiration - today) / (1000 * 60 * 60 * 24);
    return diffInDays <= 2;
  };

  return (
    <div>
      <Navbar />
      <div className="user-foods-container">
        <button className="back-button" onClick={handleBack}>Back</button>

        <div className="user-food-items-container">
        {user && (
          <h2>
            <span className="top-username">{user.firstName} {user.lastName}</span>
          </h2>
        )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!foodItems.length && !error && <p>No items..</p>}

          {foodItems.length > 0 && (
            <div className="food-items-list">
              {foodItems.map((item) => (
                <div
                  key={item.id}
                  className={`food-item ${isExpiringSoon(item.expirationDate) ? 'expiring-soon' : ''}`}
                >
                  <span>{item.name} - Expires on {new Date(item.expirationDate).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFoods;
