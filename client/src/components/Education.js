import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";
import CustomDatePicker from "./CustomDatePicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const EducationItem = ({
  education,
  index,
  handleChange,
  handleDeleteEducation,
  openIndex,
  setOpenIndex,
  updateFormData,
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
              Education {index + 1}
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
                    <label className="form-label">School:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={education.school}
                      onChange={(e) =>
                        handleChange(index, "school", e.target.value)
                      }
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">City:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={education.city}
                      onChange={(e) =>
                        handleChange(index, "city", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Start Date:</label>
                    <CustomDatePicker
                      selectedDate={education.startDate}
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
                      selectedDate={education.endDate}
                      onChange={(date) => handleChange(index, "endDate", date)}
                      isPresent={!education.endDate}
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
                    <label className="form-label">Degree:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={education.degree}
                      onChange={(e) =>
                        handleChange(index, "degree", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Description:</label>
                    <ReactQuill
                      value={education.description}
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
        onClick={() => handleDeleteEducation(index)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  </div>
);

const Education = ({ formData, updateFormData }) => {
  const [educations, setEducations] = useState(formData.educationData || []);

  useEffect(() => {
    setEducations(formData.educationData || []);
  }, [formData.educationData]);

  const [openIndex, setOpenIndex] = useState(0);

  const handleChange = (index, fieldName, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index][fieldName] = value;
    setEducations(updatedEducations);
    updateFormData({ educationData: updatedEducations }); // Update formData with education data
  };

  const handleDeleteEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
    if (openIndex === index) {
      setOpenIndex(-1);
    } else if (openIndex > index) {
      setOpenIndex(openIndex - 1);
    }
    updateFormData({ educationData: updatedEducations }); // Update formData with education data
  };

  const handleAddEducation = () => {
    setEducations([...educations, getDefaultEducation()]);
    setOpenIndex(educations.length);
    updateFormData({ educationData: [...educations, getDefaultEducation()] }); // Update formData with education data
  };

  const getDefaultEducation = () => ({
    school: "",
    city: "",
    degree: "",
    startDate: null,
    endDate: null,
    description: "",
  });

  return (
    <div>
      <h2 className="title">Education</h2>
      {educations.map((education, index) => (
        <EducationItem
          key={index}
          education={education}
          index={index}
          handleChange={handleChange}
          handleDeleteEducation={handleDeleteEducation}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          updateFormData={updateFormData}
        />
      ))}
      <button className="btn rounded-button" onClick={handleAddEducation}>
        <FontAwesomeIcon icon={faPlus} /> Add Education
      </button>
    </div>
  );
};

export default Education;
