import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://food-waste-app-api.azurewebsites.net/api/user/login', {
                email: email,
                password: password,
            }, {withCredentials: true});
            navigate('/home');
        } catch (err) {
            setError('Invalid email or password');
            console.error('Error logging in:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                    {error && <div className="error-message">{error}</div>}
                    <div className="signup-prompt">
                        New Here? <a href="/register" className="signup-link">Create an Account</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
