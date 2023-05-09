import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./css/Navbar.css";
import logo from "./Assets/logo final.png";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SearchResults from "./SearchResults";

function Navbar({ loggedIn, onLogout, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation(); // use useLocation hook

  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setname] = useState("");
  const [authorSearchTerm, setAuthorSearchTerm] = useState("");
  const [category, setcategory] = useState("All");
  const [sortFilter, setSortFilter] = useState("Latest");
  const [searchResults, setSearchResults] = useState([]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookSearchChange = (event) => {
    setname(event.target.value);
  };

  const handleAuthorSearchChange = (event) => {
    setAuthorSearchTerm(event.target.value);
  };

  const handlecategoryChange = (event) => {
    setcategory(event.target.value);
  };

  const handleSortFilterChange = (event) => {
    setSortFilter(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const searchTerm = {
      name,
      authorSearchTerm,
      // category,
      // sortFilter,
    };
    try {
      const response = await axios.post("http://localhost:4000/search", searchTerm);
      setSearchResults(response.data);
      navigate("/searchResults"); // navigate only when search is made
      setIsExpanded(false);
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
                  <select value={category} onChange={handlecategoryChange}>
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
      {searchResults.length > 0 && location.pathname === "/searchResults" && (
        <SearchResults searchResults={searchResults} />
      )}
    </nav>
  );
}

export default Navbar;