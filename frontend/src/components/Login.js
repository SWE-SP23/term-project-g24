import React, { useState } from "react";
import "./css/Login.css"

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <a href="#" onClick={props.toggleForm}>
          Create a new account
        </a>
      </p>
      </div>
    </div>
  );
}

export default Login;