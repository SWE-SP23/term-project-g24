import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Book from "./components/Book";
import Author from "./components/Author";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Tips from "./components/Tips";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book" element={<Book />} />
          <Route path="/author" element={<Author />} />
          <Route path="/search" element={<Search />} />
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