import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const App = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("https://food-waste-app-api.azurewebsites.net/api/user/getLoggedInUser", {withCredentials: true});
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
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default App;
