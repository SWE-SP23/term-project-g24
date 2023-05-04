import React, { useState } from "react";
// import "./css/Login.css"
function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send name, email, and password to backend API for user creation
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
  };

  return (
    <div class = "login-form">
        <div class= "form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
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
      </div>
    </div>
  );
}

export default Signup;