import React from 'react';
import "./css/Theme.css"
import { Link } from "react-router-dom";
import graphic from "./Assets/page picture 02.png"
function Home() {
  return (
    <div>
      <img src={graphic} alt = "Books" style={{ width: "1280px", height: "720px" }}></img>
      <Link to="/search" class="image-button" >Explore</Link>
      </div>
  );
}

export default Home;