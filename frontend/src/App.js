import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Book from "./components/Book";
import Author from "./components/Author";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book" element={<Book />} />
          <Route path="/author" element={<Author />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login toggleForm={toggleForm} />} />
          <Route path="/signup" element={<Signup toggleForm={toggleForm} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;