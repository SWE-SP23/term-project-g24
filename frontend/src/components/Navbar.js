import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./css/Navbar.css";
import logo from "./Assets/logo final.png";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SearchResults from "./SearchResults";

function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation(); // use useLocation hook

  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState("");
  const [author_name, setAuthorName] = useState("");
  const [category, setCategory] = useState("All");
  const [searchResults, setSearchResults] = useState([]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookSearchChange = (event) => {
    setName(event.target.value);
  };

  const handleAuthorSearchChange = (event) => {
    setAuthorName(event.target.value);
  };

  const handlecategoryChange = (event) => {
    if(event.target.value === "All") {
      setCategory("");
    } else {
      setCategory(event.target.value);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setSearchResults([]); // clear searchResults state
    const searchTerm = {
      name,
      author_name,
      category,
    };
    try {
      if(searchTerm.category==="All") searchTerm.category = "";
      const response = await axios.post(
        "http://localhost:4000/search_by_parameter",
        searchTerm
      );
      console.log(searchTerm);
      console.log(response);
      setTimeout(() => {
        setSearchResults(response.data);
        navigate("/searchResults"); // navigate only when search is made
      }, 0);
      searchTerm.category = "";
      searchTerm.name="";
      searchTerm.author_name="";
      setIsExpanded(false);
      setName("");
      setAuthorName("");
      setCategory("All");
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Bookscape{/* <img src={logo} alt="Laura's Library" style={{ width: "95px", height: "61px" }} /> */}
      </Link>
      <div className="navbar-btn-box">
        <Link to="/" className="navbar-btn">
          Home
        </Link>
        {loggedIn && (
          <Link to="/profile" className="navbar-btn">
            Profile
          </Link>
        )}
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