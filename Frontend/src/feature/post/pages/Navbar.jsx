import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";
import "../style/Navbar.css";

const Navbar = () => {
  const { user } = useAuth();
  const firstLetter = user?.username?.charAt(0)?.toUpperCase() || "G";

  return (
    <header className="top-nav-wrap">
      <nav className="top-nav">
        <NavLink to="/homepage" className="brand">
          <span className="brand__dot" />
          <span>SocialLoop</span>
        </NavLink>

        <div className="top-nav__links">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? "top-nav__link top-nav__link--active" : "top-nav__link"
            }
          >
            Feed
          </NavLink>
          <NavLink
            to="/connection"
            className={({ isActive }) =>
              isActive ? "top-nav__link top-nav__link--active" : "top-nav__link"
            }
          >
            Connection
          </NavLink>
          <NavLink
            to="/createpost"
            className={({ isActive }) =>
              isActive ? "top-nav__link top-nav__link--active" : "top-nav__link"
            }
          >
            Create Post
          </NavLink>
        </div>

        <div className="top-nav__profile">
          <span className="top-nav__hello">Hi, {user?.username || "Guest"}</span>
          <span className="top-nav__avatar">{firstLetter}</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
