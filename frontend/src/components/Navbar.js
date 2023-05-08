import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import logo from "./Assets/logo final.png";

function Navbar({ loggedIn, onLogout }) {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Laura's Library" style={{ width: "95px", height: "61px" }} />
      </Link>
      <div className="navbar-btn-box">
        <Link to="/" className="navbar-btn">
          Home
        </Link>
        <Link to="/search" className="navbar-btn">
          Library
        </Link>
        <Link to="/tips" className="navbar-btn">
          Tips
        </Link>
        {loggedIn ? (
          <Link to="/" onClick={handleSignOut} className="navbar-btn">
            Sign Out
          </Link>
        ) : (
          <Link to="/login" className="navbar-btn">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;