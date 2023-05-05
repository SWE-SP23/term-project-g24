import React from "react";
import "./css/Footer.css";
import facebook from "./Assets/facebook.png";
import instagram from "./Assets/instagram.png";
import twitter from "./Assets/twitter.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="contact-us">Contact us</p>
      <div id="images">
        <img src={facebook} alt="Facebook" style={{ width: "35px", height: "35px", marginRight: "10px" }} />
        <img src={instagram} alt="Instagram" style={{ width: "35px", height: "35px", marginRight: "10px" }} />
        <img src={twitter} alt="Twitter" style={{ width: "35px", height: "35px" }} />
      </div>
      <p className="contact-us" id="email">Laura@gmail.com</p>

    </footer>
  );
}

export default Footer;