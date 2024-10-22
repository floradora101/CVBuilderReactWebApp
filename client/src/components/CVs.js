import React, { useState, useEffect } from "react";
import CVCard from "./CVCard";
import { useLocation, useNavigate } from "react-router-dom";

const CVs = () => {
  const [cvs, setCVs] = useState([]);
  const location = useLocation(); // Retrieve the location object
  const navigate = useNavigate();

  // Extract the message from location.state
  const { state } = location;
  const message = state?.message;
  const messageType = state?.type;

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:5000/cv/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCVs(data.studentCVs); // Update state with fetched CV data
        } else {
          console.error("Failed to fetch CVs:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };

    fetchCVs();
  }, []);

  const deleteCV = async (cvId) => {
    try {
      console.log(cvId);
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5000/cv/${cvId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        // If deletion is successful, remove the CV from the state
        setCVs((prevCVs) => prevCVs.filter((cv) => cv.id !== cvId));
        console.log("Deleted CV with ID:", cvId);
      } else {
        console.error("Failed to delete CV:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

  const editCV = async (cvId, templateId) => {
    try {
      navigate(`/edit-cv/${cvId}`, { state: { templateId } });
    } catch (error) {
      console.error("Error fetching CV:", error);
      // Handle the error as needed, e.g., show a message to the user
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Your CVs</h2>
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
      <div className="row">
        {cvs.map((cv) => (
          <CVCard
            key={cv.id}
            cv={cv}
            onDelete={() => deleteCV(cv.id)}
            onEdit={() => editCV(cv.id, cv.templateId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CVs;
