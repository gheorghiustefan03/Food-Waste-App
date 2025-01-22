import React, { useState } from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import './Home.css';

const Home = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
                <button className="add-item-button" onClick={handleOpenModal}>Add Item</button>
                <canvas id="backgroundCanvas" className="background-canvas"></canvas>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal}>
                <h2>Add a new item</h2>
                <p>Form or content goes here...</p>
            </Modal>
        </div>
    );
};

export default Home;