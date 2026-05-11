import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  RiLogoutBoxLine,
} from "react-icons/ri";
import { useAuth } from "../../auth/hook/useAuth";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const onLogout = async () => {
    const success = await handleLogout();
    if (success) {
      navigate("/login");
    }
  };

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

        <NavLink
          to="/connection"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <RiGroupFill /> : <RiGroupLine />}
              <span className="sidebar__label">Connection</span>
            </>
          )}
        </NavLink>

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
        <div className="sidebar__item" onClick={onLogout} style={{ cursor: 'pointer' }}>
          <RiLogoutBoxLine />
          <span className="sidebar__label">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
