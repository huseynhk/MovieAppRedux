import React from "react";
import "./navbar.css";
import { HOME, MY_LIST } from "../../constants/path";
import { TbHomeFilled } from "react-icons/tb";
import { GiTechnoHeart } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { movies } = useSelector((store) => store.favorite);

  return (
    <div className="navbar">
      <div className="left">
        <NavLink to={HOME}>
          <h1>MyFilm</h1>
        </NavLink>
      </div>

      <div className="right">
        <ul>
          <li>
            <NavLink 
              to={HOME} 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <TbHomeFilled />
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={MY_LIST} 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <GiTechnoHeart />
              <div className="favorite-count">{movies.length}</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
