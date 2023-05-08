import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Book from "./components/Book";
import Author from "./components/Author";
import SearchResults from "./components/SearchResults";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Tips from "./components/Tips";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [searchResults, setSearchResults] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book" element={<Book />} />
          <Route path="/author" element={<Author />} />
          {searchResults.length > 0 && (
            <Route path="/search" element={<SearchResults searchResults={searchResults} />} />
          )}
          <Route path="/tips" element={<Tips />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;