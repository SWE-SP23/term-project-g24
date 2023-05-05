import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import logo from "./Assets/logo final.png"

function Navbar() {

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Laura's Library" style={{ width: "95px", height: "61px" }}></img>
      </Link>
      <div className="navbar-btn-box">
        <Link to="/" className="navbar-btn">
          Home
        </Link>
        <Link to="/search" className="navbar-btn">
          Library
        </Link>
        <Link to="/" className="navbar-btn">
          Tips
        </Link>
        <Link to="/login" className="navbar-btn">
          Sign in
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;