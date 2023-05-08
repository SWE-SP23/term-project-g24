import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css/Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/auth/sign_in', {
        email,
        password,
      });

      localStorage.setItem('token', response.headers.authorization);
      
      // Call the onLogin function to update the loggedIn state
      onLogin();
      
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here, such as displaying an error message to the user
    }
  };

  return (
    <div className = "login-form">
      <div className = "form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          New user?{" "}
          <a href="/signup">
            Create a new account
          </a>
        </p>
      </div>
      <p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>
    </div>
  );
};

export default Login;