import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import Modal from './Modal';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [foodItems, setFoodItems] = useState([]);
    const [user, setUser] = useState(null);
    const [newFood, setNewFood] = useState({ name: '', expirationDate: '' });
    const [error, setError] = useState('');

    // Fetch user info only once when the component mounts
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get("http://localhost:1234/api/user/getLoggedInUser", { withCredentials: true });
                if (response.status === 400) {
                    navigate("/login");
                } else {
                    setUser(response.data); // Set user only if not already set
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                navigate("/login");
            }
        };

        checkAuthentication();
    }, [navigate]); // Run this effect only once when the component mounts

    // Fetch food items once the user is authenticated
    useEffect(() => {
        if (user) {
            const fetchFoodItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:1234/api/foodItem/getByUserId/${user.user.id}`, { withCredentials: true });
                    setFoodItems(response.data);
                } catch (err) {
                    console.error('Error fetching food items:', err);
                }
            };
            fetchFoodItems();
        }
    }, [user]); // Only fetch food items if the user is set

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setError('');
        setNewFood({ name: '', expirationDate: '' });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    const handleAddFood = async () => {
        if (!newFood.name || !newFood.expirationDate) {
            setError('All fields are required.');
            return;
        }
        try {
            if (user) {  // Only add food if user is set
                newFood.UserId = user.user.id;  // Use the already set user from the state
                const response = await axios.post("http://localhost:1234/api/foodItem/create", newFood, { withCredentials: true });
                setFoodItems([...foodItems, response.data]);
                handleCloseModal();
            }
        } catch (err) {
            setError('Failed to add food item. Please check the inputs.');
            console.error(err);
        }
    };

    const handleRemoveFood = async (id) => {
        try {
            await axios.delete(`http://localhost:1234/api/foodItem/delete/${id}`, { withCredentials: true });
            setFoodItems(foodItems.filter((item) => item.id !== id));
        } catch (err) {
            console.error('Error removing food item:', err);
        }
    };

    const isExpiringSoon = (date) => {
        const today = new Date();
        const expiration = new Date(date);
        const diffInDays = (expiration - today) / (1000 * 60 * 60 * 24);
        return diffInDays <= 2;
    };

    return (
        <div className="home">
            <Navbar />
            <div className="home-content">
                <table className="table-as-list">
                    <thead>
                        <tr>
                            <th>Friends</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                        </tr>
                    </tbody>
                </table>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-box"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button">Follow</button>
                </div>
                {foodItems.length > 0 && (
                    <div className="food-items-container">
                        <h2>Food Items</h2>
                        <div className="food-items-list">
                            {foodItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`food-item ${isExpiringSoon(item.expirationDate) ? 'expiring-soon' : ''}`}
                                >
                                    <span>{item.name} - Expires on {new Date(item.expirationDate).toLocaleDateString()}</span>
                                    <button className="remove-button" onClick={() => handleRemoveFood(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button className="add-item-button" onClick={handleOpenModal}>Add Food Item</button>
                <canvas id="backgroundCanvas" className="background-canvas"></canvas>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal}>
                <h2>Add a Food Item</h2>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Food Name"
                        value={newFood.name}
                        onChange={handleFormChange}
                        className="form-input"
                    />
                    <input
                        type="date"
                        name="expirationDate"
                        placeholder="Expiration Date"
                        value={newFood.expirationDate}
                        onChange={handleFormChange}
                        className="form-input"
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="button" onClick={handleAddFood} className="add-button">Add Food</button>
                </form>
            </Modal>
        </div>
    );
};

export default Home;
