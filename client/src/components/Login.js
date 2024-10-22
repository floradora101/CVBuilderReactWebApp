import "./styles.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false, // State to toggle password visibility
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };
  const { state } = useLocation();
  const [error, setError] = useState(state?.error || "");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     // Extract the access token and user object from the response
  //     const { accessToken, user } = await response.json();

  //     // Store the access token in local storage
  //     localStorage.setItem("accessToken", accessToken);

  //     // Store the user's first name in local storage
  //     localStorage.setItem("username", user.firstName);

  //     // Set the authentication state to indicate the user is logged in
  //     localStorage.setItem("isLoggedIn", true);

  //     // Navigate to /templates
  //     navigate("/templates");
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     // Handle login failure (display error message, etc.)
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { accessToken, user } = await response.json();

      // Store the access token and user-specific information in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", user.firstName);
      localStorage.setItem("userId", user.id); // Assuming user.id is the unique identifier
      localStorage.setItem("isLoggedIn", true);

      // Navigate to /templates
      navigate("/templates");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (display error message, etc.)
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="title">Welcome back!</h2>
              {/* Display error message if error state is not empty */}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3 input-container">
                  <input
                    type="email"
                    className="form-control input-with-border"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="mb-3 input-container">
                  <div className="input-group">
                    <input
                      type={formData.showPassword ? "text" : "password"}
                      className="form-control input-with-border"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                    <button
                      className="btn btn-outline-secondary eye-icon"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={formData.showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
                <div className="mb-3 input-container">
                  <div className="text-center">
                    <button type="submit" className="btn rounded-button">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
