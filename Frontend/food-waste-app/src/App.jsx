import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:1234/api/user/getLoggedInUser");
        if (response.status === 200) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;