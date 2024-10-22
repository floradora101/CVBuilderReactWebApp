import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Clear access token and authentication state from local storage
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("isLoggedIn");
  //   localStorage.removeItem("username");
  //   // Redirect user to login page
  //   navigate("/login");
  // };
  const handleLogout = () => {
    // Clear all user-specific data from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    // Remove form data associated with the current user
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`formData_${userId}`);
    }
    localStorage.removeItem("userId"); // Optionally remove userId if you store it

    // Redirect user to the login page
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ fontFamily: "Style Script, cursive", fontSize: "30px" }}
        >
          CV Builder
        </Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto">
            {/* NavLink for Profile page */}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/profile"
                  activeClassName="active-link"
                >
                  Profile
                </NavLink>
              </li>
            )}
            {/* NavLink for Templates page */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/templates"
                activeClassName="active-link"
              >
                Templates
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">{`Welcome, ${username}`}</span>
                </li>
                <li className="nav-item">
                  <button className="btn nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    activeClassName="active-link"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    activeClassName="active-link"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
