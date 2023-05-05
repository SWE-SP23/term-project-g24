import React, { useState } from "react";
import axios from 'axios';
import "./css/Login.css"
// import "./css/Theme.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const handleSubmit = async(event) => {
    event.preventDefault();
    try {
    const response = await axios.post('/auth/sign_in', {
      email,
      password,
    });

    console.log(response.data);
    // Do something with the response data, such as updating the state of your React component
  } catch (error) {
    console.error('Error:', error);
    // Handle the error here, such as displaying an error message to the user
  }
    // Send email and password to backend API for authentication
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div class = "login-form">
      {/* <h1>Login</h1> */}
      <div class = "form">
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
        <a href="/Signup">
          Create a new account
        </a>
      </p>
      </div>
    </div>
  );
};

export default Login;