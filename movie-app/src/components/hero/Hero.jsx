import React from "react";
import "./Hero.css";
import Batman from "./imgs/batman.jpg";

const Hero = () => {
  return (
    <section className="hero-container">
      <img src={Batman} alt="Batman" className="hero-image" />
      <div className="hero-overlay">
        <div className="hero-content">
          <h3 className="hero-genres">action, drama, thriller, horror</h3>
          <h1 className="hero-title">MyFilm</h1>
          <p className="hero-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat at
            cumque maiores non consequatur veniam nesciunt mollitia! Sapiente
            culpa deleniti quis quam nam voluptas id, accusamus iure quisquam,
            officiis debitis iusto earum laudantium alias harum ad neque dolor
            ipsa non? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Sed hic culpa incidunt eveniet, reiciendis aperiam nihil nulla
            veniam maxime mollitia expedita natus cupiditate accusamus voluptas
            quasi dolore soluta consequuntur quaerat!
          </p>
          <div className="hero-actions"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
