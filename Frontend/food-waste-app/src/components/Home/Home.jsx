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
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_HOST}/api/user/getLoggedInUser`, { withCredentials: true });
                if (response.status === 400) {
                    navigate("/login");
                } else {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                navigate("/login");
            }
        };

        checkAuthentication();
    }, [navigate]);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const foodResponse = await axios.get(`${import.meta.env.VITE_API_HOST}/api/foodItem/getByUserId/${user.user.id}`, { withCredentials: true });
                    setFoodItems(foodResponse.data);

                    const friendsResponse = await axios.get(`${import.meta.env.VITE_API_HOST}/api/follows/getFriends/${user.user.id}`, { withCredentials: true });
                    const friendPromises = friendsResponse.data.map(async (friend) => {
                        const userResponse = await axios.get(`${import.meta.env.VITE_API_HOST}/api/user/get/${friend.followeeId}`);
                        return {
                            id: friend.followeeId,
                            name: `${userResponse.data.firstName} ${userResponse.data.lastName}`
                        };
                    });

                    const friendData = await Promise.all(friendPromises);
                    setFriends(friendData);
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            };

            fetchData();
        }
    }, [user]);

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
            if (user) { 
                newFood.UserId = user.user.id;
                const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/foodItem/create`, newFood, { withCredentials: true });
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
            await axios.delete(`${import.meta.env.VITE_API_HOST}/api/foodItem/delete/${id}`, { withCredentials: true });
            setFoodItems(foodItems.filter((item) => item.id !== id));
        } catch (err) {
            console.error('Error removing food item:', err);
        }
    };

    const handleFollow = async () => {
        try {
            const users = await axios.get(`${import.meta.env.VITE_API_HOST}/api/user/get`);
            const foundUser = users.data.find(otherUser => otherUser.email === searchTerm);
            if (foundUser) {
                const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/follows/create`, { 
                    followerId: user.user.id, 
                    followeeId: foundUser.id 
                }, { withCredentials: true });

                if (response.status === 200) {
                    setFriends([...friends, { id: foundUser.id, name: `${foundUser.firstName} ${foundUser.lastName}` }]);
                    setSearchTerm('');
                }
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleRemoveFriend = async (friendId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_HOST}/api/follows/delete/${user.user.id}/${friendId}`, { withCredentials: true });
            setFriends(friends.filter((friend) => friend.id !== friendId));
            setSelectedFriend(null);
        } catch (err) {
            console.error('Error removing friend:', err);
        }
    };

    const handleFriendClick = (friendId) => {
        setSelectedFriend(selectedFriend === friendId ? null : friendId);
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
                <div className="friends-list-container">
                    <table className="table-as-list">
                        <thead>
                            <tr>
                                <th>Friends</th>
                            </tr>
                        </thead>
                        <tbody>
                            {friends.length > 0 ? (
                                friends.map((friend) => (
                                    <tr key={friend.id}>
                                        <td
                                            className="friend-name"
                                            onClick={() => handleFriendClick(friend.id)}
                                        >
                                            {friend.name}
                                            {selectedFriend === friend.id && (
                                                <div className="dropdown-menu">
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleRemoveFriend(friend.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => navigate(`/foods/${friend.id}`)}
                                                    >
                                                        View Food List
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No friends yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="search-container">
                        <input
                            type="email"
                            className="search-box"
                            placeholder="Search by email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-button" onClick={handleFollow}>Follow</button>
                    </div>
                </div>
                <button className="add-item-button" onClick={handleOpenModal}>Add Food Item</button>
                <div className="food-items-container">
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
