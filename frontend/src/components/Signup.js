import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import "./css/Login.css"
function Signup(props) {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 



const handleSubmit = async(event) => {
    event.preventDefault();
    try {
    const response = await axios.post('http://localhost:4000/auth/register', {
      fullName,
      email,
      password,
    });


    console.log(response.data);
    navigate('/login');

    // Do something with the response data, such as updating the state of your React component
  } catch (error) {
    document.getElementById("error").innerHTML = "Email already exists";
    console.error('Error:', error);
    // Handle the error here, such as displaying an error message to the user
  }
    // Send fullName, email, and password to backend API for user creation
    console.log(`Name: ${fullName}, Email: ${email}, Password: ${password}`);
  };


  return (
    <div className = "login-form">
        <div className= "form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={fullName}
          onChange={(event) => setName(event.target.value)}
        />
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
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="/Login">
          Sign in
        </a>
      </p>
      <p id="error"></p>
      </div>
      <p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>

    </div>
  );
};

export default Signup;