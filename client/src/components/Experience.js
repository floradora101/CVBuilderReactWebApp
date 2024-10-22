import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap"; // Import Bootstrap Collapse
import CustomDatePicker from "./CustomDatePicker";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const ExperienceItem = ({
  experience,
  index,
  handleChange,
  handleDeleteExperience,
  openIndex,
  setOpenIndex,
}) => (
  <div className="row align-items-center mb-3">
    <div className="col">
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`rounded-button accordion-button ${
                openIndex === index ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              Experience {index + 1}
            </button>
          </h2>
          <Collapse in={openIndex === index}>
            <div
              className={`accordion-collapse ${
                openIndex === index ? "collapse show" : "collapse"
              }`}
            >
              <div className="accordion-body">
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Job Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={experience.jobTitle}
                      onChange={(e) =>
                        handleChange(index, "jobTitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Employer:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={experience.employer}
                      onChange={(e) =>
                        handleChange(index, "employer", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Start Date:</label>
                    <CustomDatePicker
                      selectedDate={experience.startDate}
                      onChange={(date) =>
                        handleChange(index, "startDate", date)
                      }
                      isPresent={false}
                      onPresentChange={(e) =>
                        handleChange(
                          index,
                          "startDate",
                          e.target.checked ? null : new Date()
                        )
                      }
                      isEndDate={false} // Pass false for the start date
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">End Date:</label>
                    <CustomDatePicker
                      selectedDate={experience.endDate}
                      onChange={(date) => handleChange(index, "endDate", date)}
                      isPresent={!experience.endDate}
                      onPresentChange={(e) =>
                        handleChange(
                          index,
                          "endDate",
                          e.target.checked ? null : new Date()
                        )
                      }
                      isEndDate={true} // Pass true for the end date
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">City:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={experience.city}
                      onChange={(e) =>
                        handleChange(index, "city", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Description:</label>
                    <ReactQuill
                      value={experience.description}
                      onChange={(value) =>
                        handleChange(index, "description", value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
    <div className="col-auto">
      <button
        className="btn btn-sm rounded-button"
        onClick={() => handleDeleteExperience(index)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  </div>
);

const Experience = ({ formData, updateFormData }) => {
  const [experiences, setExperiences] = useState(formData.experienceData || []);

  useEffect(() => {
    setExperiences(formData.experienceData || []);
  }, [formData.experienceData]);

  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    // Open the first accordion item when entering the section
    setOpenIndex(0);
  }, []);

  const handleChange = (index, fieldName, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][fieldName] = value;

    // Validate end date against start date
    if (
      fieldName === "endDate" &&
      value &&
      value < updatedExperiences[index]["startDate"]
    ) {
      // Show an alert or set a message state
      alert("End date cannot be smaller than the start date.");
      // You can also set a message state to display the message in the UI
      return; // Prevent further execution
    }

    setExperiences(updatedExperiences);
    updateFormData({ experienceData: updatedExperiences }); // Update formData with experience data
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, getDefaultExperience()]);
    setOpenIndex(experiences.length);
    updateFormData({
      experienceData: [...experiences, getDefaultExperience()],
    }); // Update formData with experience data
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
    if (openIndex === index) {
      setOpenIndex(-1);
    } else if (openIndex > index) {
      setOpenIndex(openIndex - 1);
    }
    updateFormData({ experienceData: updatedExperiences }); // Update formData with experience data
  };

  const getDefaultExperience = () => ({
    jobTitle: "",
    employer: "",
    startDate: null,
    endDate: null,
    city: "",
    description: "",
  });

  return (
    <div>
      <h2 className="title">Experience</h2>
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={index}
          experience={experience}
          index={index}
          handleChange={handleChange}
          handleDeleteExperience={handleDeleteExperience}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
      ))}
      <button className="btn rounded-button" onClick={handleAddExperience}>
        <FontAwesomeIcon icon={faPlus} /> Add Experience
      </button>
    </div>
  );
};

export default Experience;
