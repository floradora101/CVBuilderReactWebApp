// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Templates from "./components/Templates";
import FormPage from "./components/FormPage";
import CVs from "./components/CVs";
import ProfileFormPage from "./components/ProfileFormPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/profile" element={<CVs />} />
          <Route
            path="/templates/:templateId"
            element={
              <ProtectedRoute error="You must be logged in to create your cv">
                <FormPage />
              </ProtectedRoute>
            }
          />

          {/* Add other routes */}
          <Route path="/edit-cv/:cvId" element={<ProfileFormPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-8">
          <h2 className="home-title">Welcome to CV Builder!</h2>
          <p className="home-description">
            Create a professional CV effortlessly with our easy-to-use CV Builder.
            Simply choose a template, fill in your details,  and download your CV.
          </p>
          <Link to="/templates" className="btn btn-primary rounded-button">
            Get Started
          </Link>
        </div>
        <div className="col-md-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/cv-background.png`}
            alt="CV Background"
            className="cv-image"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
