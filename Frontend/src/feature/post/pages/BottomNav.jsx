import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiHome5Line,
  RiHome5Fill,
  RiCompass3Line,
  RiCompass3Fill,
  RiAddBoxLine,
  RiAddBoxFill,
  RiVideoLine,
  RiVideoFill,
  RiUser3Line,
  RiUser3Fill,
  RiGroupLine,
  RiGroupFill,
} from "react-icons/ri";
import "./BottomNav.css";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
        }
      >
        {({ isActive }) => (isActive ? <RiHome5Fill /> : <RiHome5Line />)}
      </NavLink>

      <NavLink
        to="/connection"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
        }
      >
        {({ isActive }) => (isActive ? <RiGroupFill /> : <RiGroupLine />)}
      </NavLink>

      <NavLink
        to="/createpost"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
        }
      >
        {({ isActive }) => (isActive ? <RiAddBoxFill /> : <RiAddBoxLine />)}
      </NavLink>



      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
        }
      >
        {({ isActive }) => (isActive ? <RiUser3Fill /> : <RiUser3Line />)}
      </NavLink>
    </div>
  );
};

export default BottomNav;
