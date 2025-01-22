import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register'
import UserFoods from './components/UserFoods/UserFoods'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/foods/:userId" element={<UserFoods />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
