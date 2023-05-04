import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      window.location.href = `/search?q=${searchTerm}`;
      setSearchTerm("");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Website Name
      </Link>
      <form onSubmit={handleSearch} className="navbar-search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit" className="navbar-search-btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <Link to="/login" className="navbar-btn">
        Sign in
      </Link>
    </nav>
  );
}

export default Navbar;