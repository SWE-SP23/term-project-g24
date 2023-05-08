import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import logo from "./Assets/logo final.png";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

function Navbar({ loggedIn, onLogout, onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bookSearchTerm, setBookSearchTerm] = useState("");
  const [authorSearchTerm, setAuthorSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Latest");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookSearchChange = (event) => {
    setBookSearchTerm(event.target.value);
  };

  const handleAuthorSearchChange = (event) => {
    setAuthorSearchTerm(event.target.value);
  };

  const handleGenreFilterChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const handleSortFilterChange = (event) => {
    setSortFilter(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const searchTerm = {
      bookSearchTerm,
      authorSearchTerm,
      genreFilter,
      sortFilter,
    };
    try {
      const response = await axios.post("/api/search", searchTerm);
      onSearch(response.data);
    } catch (error) {
      console.log(error);
    }
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
        <Link to="/profile" className="navbar-btn">
          Profile
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
        <div className="navbar-search-btn" onClick={handleSearchClick}>
          <FaSearch />
        </div>
        {isExpanded && (
          <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
            <div className="navbar-search-box">
              <input type="text" placeholder="Search books" onChange={handleBookSearchChange} />
              <input type="text" placeholder="Search authors" onChange={handleAuthorSearchChange} />
              <div className="navbar-filters">
                <div className="navbar-filter">
                  <select value={genreFilter} onChange={handleGenreFilterChange}>
                    <option value="All">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Romance">Romance</option>
                  </select>
                </div>
                <div className="navbar-filter">
                  <select value={sortFilter} onChange={handleSortFilterChange}>
                    <option value="Latest">Latest</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                  </select>
                </div>
              </div>
              <button className="navbar-search-btn" type="submit">
                Search
              </button>
            </div>
          </form>
        )}
      </div>
    </nav>
  );
}

export default Navbar;