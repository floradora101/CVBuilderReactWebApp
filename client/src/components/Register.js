import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
axios.defaults.baseURL = "http://localhost:5000/api";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
      setIsStrongPassword(strength === "Strong");
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isStrongPassword) {
        setPasswordError(
          "Password must be strong. Please check the strength indicator."
        );
        return;
      }

      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // If response is not OK, throw an error with the error message from the server
        throw new Error(responseData.error || "HTTP error!");
      }

      // Extract the access token from the response
      const { accessToken } = responseData;

      const { firstName } = formData;

      // Store the access token and user name in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", firstName);

      // Set the authentication state to indicate the user is logged in
      localStorage.setItem("isLoggedIn", true);

      navigate("/templates");
    } catch (error) {
      console.error("Registration failed:", error);

      // Check if the error message indicates email already in use
      if (error.message === "Email is already in use") {
        setPasswordError("Email is already in use");
      } else {
        setPasswordError("Registration failed. Please try again later.");
      }
    }
  };

  const checkPasswordStrength = (password) => {
    // Regular expressions to check if password meets criteria
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    // Check if password meets all criteria
    const isStrong =
      password.length >= 10 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      symbolRegex.test(password) &&
      numberRegex.test(password);

    return isStrong ? "Strong" : "Weak";
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="title">Create an account</h2>
              <form onSubmit={handleSubmit}>
                {/* firstName input */}
                <div className="mb-3 input-container">
                  <input
                    type="text"
                    className="form-control input-with-border"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                {/* lastName input */}
                <div className="mb-3 input-container">
                  <input
                    type="text"
                    className="form-control input-with-border"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
                {/* email input */}
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
                {/* password input */}
                <div className="mb-3 input-container">
                  <div className="input-group">
                    <input
                      type={formData.showPassword ? "text" : "password"}
                      className="form-control input-with-border"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password (must be at least 10 characters, contain at least one uppercase letter, one lowercase letter, one number, and one symbol)"
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
                  {/* Password strength indicator */}
                  <div className="password-strength">
                    Password strength: {passwordStrength}
                  </div>
                </div>
                {/* Message about password criteria */}
                <div className="mb-3 input-container">
                  <p>
                    <FontAwesomeIcon icon={faCircleExclamation} /> Password must
                    be at least 10 characters long and contain at least one
                    uppercase letter, one lowercase letter, one number, and one
                    symbol.
                  </p>
                </div>
                {/* Error message for password */}
                {passwordError && (
                  <div className="mb-3 input-container text-danger">
                    {passwordError}
                  </div>
                )}
                {/* Register button */}
                <div className="mb-3 input-container">
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-button"
                    >
                      Register
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

export default Register;


