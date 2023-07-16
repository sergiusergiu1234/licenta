import { Carousel } from "react-bootstrap";
import "../Styles/ControlledCarousel.css";
import { useState } from "react";
const ControlledCarousel =()=>{

    return (<div>
         <Carousel slide>
      <Carousel.Item interval={3000}>
        <img
          className="carousel-image"
          src="snwa.webp"
          alt="First slide"
        />

      </Carousel.Item >
      <Carousel.Item interval={3000}>
        <img
          className="carousel-image"
          src="maiden.png"
          alt="Second slide"
        />

 
      </Carousel.Item>
      <Carousel.Item  interval={3000}>
        <img
          className="carousel-image"
          src="burtonmen1.jpg"
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item  interval={3000}>
        <img
          className="carousel-image"
          src="piste-1-atomic.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      
      <Carousel.Item  interval={3000}>
        <img
          className="carousel-image"
          src="volkl-deaconjr-1.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>)

}
export default ControlledCarousel;