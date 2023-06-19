import React from 'react';
import "../Styles/HomePage.css"
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import ControlledCarousel from '../components/ControlledCarousel';
import { useNavigate } from "react-router";
const HomePage = () => {
    const navigate = useNavigate();
    const goShopping=()=>{
        navigate("/");
     }
 
      
    return (
      <div className="homepage-container">
        <div className="about-us-container">
          <h1 className='about-us'>About Us</h1>
          <div className='about-us-text'>
          <p>Welcome to our online store for skiers and snowboarders!<br/>
           We are focused on providing top-notch gear and accessories<br/>
            from some of the best brands in the industry.<br/>
           We have everything you need, whether you're a seasoned pro<br/>
            or just getting started, to hit the slopes with confidence.</p></div>
            <div className='logo-container'><img src="/logo.png" alt="Logo" /></div>
        </div>
        
        <div className='ribbon'></div>
        <div className="shop-now-container">
            <ControlledCarousel/>
          <Button className="shop-now-button">EXPLORE</Button>
        </div>
        <div className='ribbon'></div>
        <div className="contact-us-container">
          <Button className="contact-us-button"onClick={goShopping}>Contact Us</Button>
        </div>
      </div>
    );
  };
  
  export default HomePage;