import React from 'react';
import "./css/Theme.css"
import { Link } from "react-router-dom";
import graphic from "./Assets/page picture 02.png"
function Home(loggedIn, onLogout) {
  return (
    <div>
      <img src={graphic} alt = "Books" style={{ width: "1280px", height: "720px" }}></img>
      <Link to="/search" class="image-button" >Explore</Link>
      <div class="bookContainer">
        <div class = "bookType">
            Adel<br/ > Adel
        </div>
        <div class = "bookType">
            Manar
        </div>
        <div class = "bookType">
            Hayam
        </div>
      </div>
      <p><br/><br/><br/><br/><br/></p>
      </div>
  );
}

export default Home;