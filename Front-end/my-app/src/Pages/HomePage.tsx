import React from "react";
import "../Styles/HomePage.css";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ControlledCarousel from "../components/ControlledCarousel";
import { useNavigate } from "react-router";
import giphy from "../../public/giphy.gif";
const HomePage = () => {
  const navigate = useNavigate();
  const goShopping = () => {
    navigate("/");
  };

  const navigateToFiltering =()=>{
    navigate("/")
  }
  return (
    <div className="homepage-container">
      <div className="halfs-container">
        <img style={{ width: "50%", maxWidth: "auto" }} src="giphy.gif"></img>
        <div className="text1" onClick={()=>{navigateToFiltering(); 
                                            localStorage.setItem("f","Snowboard")}}>
          <span className="overlay-text">Snowboarding</span>
        </div>
      <div className="sepparator"></div>
        <img style={{ width: "50%", maxHeight: "auto" }} src="giphy2.gif"></img>
        <div className="text2" onClick={()=>{navigateToFiltering(); 
                                            localStorage.setItem("f","Ski")}} >
          <span className="overlay-text">Skiing</span>
        </div>
        
      </div>
      <div className="ribbon"></div>
      <div className="about-us-container">
        <h1 className="about-us">About Us</h1>
        <div className="about-us-text">
          <p>
            Welcome to our online store for skiers and snowboarders!
            <br />
            We are focused on providing top-notch gear and accessories
            <br />
            from some of the best brands in the industry.
            <br />
            We have everything you need, whether you're a seasoned pro
            <br />
            or just getting started, to hit the slopes with confidence.
          </p>
        </div>
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" />
        </div>
      </div>

      <div className="ribbon"></div>
      <div className="shop-now-container">
        <ControlledCarousel />
        <Button className="shop-now-button" onClick={goShopping}>
          EXPLORE
        </Button>
      </div>
      <div className="ribbon"></div>
      <div className="contact-us-container">
        <Button className="contact-us-button">Contact Us</Button>
      </div>
    </div>
  );
};

export default HomePage;
