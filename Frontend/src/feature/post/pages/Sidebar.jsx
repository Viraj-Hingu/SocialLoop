import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiHome5Line,
  RiHome5Fill,
  RiSearchLine,
  RiCompass3Line,
  RiCompass3Fill,
  RiVideoLine,
  RiVideoFill,
  RiMessengerLine,
  RiMessengerFill,
  RiHeartLine,
  RiHeartFill,
  RiAddBoxLine,
  RiAddBoxFill,
  RiUser3Line,
  RiUser3Fill,
  RiMenuLine,
  RiGroupLine,
  RiGroupFill,
} from "react-icons/ri";
import { useAuth } from "../../auth/hook/useAuth";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <h1 className="sidebar__logo-text">SocialLoop</h1>
      </div>

      <nav className="sidebar__nav">
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <RiHome5Fill /> : <RiHome5Line />}
              <span className="sidebar__label">Home</span>
            </>
          )}
        </NavLink>

        <div className="sidebar__item">
          <RiSearchLine />
          <span className="sidebar__label">Search</span>
        </div>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <RiCompass3Fill /> : <RiCompass3Line />}
              <span className="sidebar__label">Explore</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/reels"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <RiVideoFill /> : <RiVideoLine />}
              <span className="sidebar__label">Reels</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <RiMessengerFill /> : <RiMessengerLine />}
              <span className="sidebar__label">Messages</span>
            </>
          )}
        </NavLink>

        <div className="sidebar__item">
          <RiHeartLine />
          <span className="sidebar__label">Notifications</span>
        </div>

        <NavLink
          to="/createpost"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <RiAddBoxFill /> : <RiAddBoxLine />}
              <span className="sidebar__label">Create</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <RiUser3Fill /> : <RiUser3Line />}
              <span className="sidebar__label">Profile</span>
            </>
          )}
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__item">
          <RiMenuLine />
          <span className="sidebar__label">More</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
