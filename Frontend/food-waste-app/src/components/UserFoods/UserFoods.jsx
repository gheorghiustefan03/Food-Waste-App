import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserFoods = () => {
  const { userId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserFoods = async () => {
      try {
        const response = await axios.get(`http://localhost:1234/api/foodItem/getByUserId/${userId}`);
        setFoodItems(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user food items.");
      }
    };

    fetchUserFoods();
  }, [userId]);

  return (
    <div>
      <h1>User Foods</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!foodItems.length && !error && <p>Loading food items...</p>}

      <ul>
        {foodItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.expirationDate} - {item.UserId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFoods;
