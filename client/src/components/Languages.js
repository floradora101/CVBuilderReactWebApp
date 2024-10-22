import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const LanguageItem = ({ language, proficiency, onDelete }) => (
  <div className="row align-items-center mb-3">
    <div className="col">
      <p>{language}</p>
      <p>Proficiency: {proficiency}</p>
    </div>
    <div className="col-auto">
      <button className="btn btn-sm rounded-button" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  </div>
);

const Languages = ({ formData, updateFormData }) => {
  const [languageData, setLanguageData] = useState(formData.languageData || []);

  useEffect(() => {
    // Update the form data whenever language data changes
    updateFormData({ languageData });
  }, [languageData, updateFormData]);

  const proficiencyLevels = ["A1", "A2", "B1", "B2", "C1", "C2","Native Language","Exoert"];

  const handleAddLanguage = () => {
    if (newLanguage.trim() !== "") {
      const newLanguageObj = {
        language: newLanguage,
        proficiency: newProficiency,
      };
      setLanguageData((prevLanguageData) => [...prevLanguageData, newLanguageObj]);
      setNewLanguage("");
      setNewProficiency("A1");
    }
  };

  const handleDeleteLanguage = (index) => {
    setLanguageData((prevLanguageData) =>
      prevLanguageData.filter((_, i) => i !== index)
    );
  };

  const [newLanguage, setNewLanguage] = useState("");
  const [newProficiency, setNewProficiency] = useState("A1");

  return (
    <div>
      <h2 className="title">Languages</h2>

      {/* Add Language Form */}
      <div className="mt-3 mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="Enter Language"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
          />
          <select
            className="form-select rounded-end"
            value={newProficiency}
            onChange={(e) => setNewProficiency(e.target.value)}
          >
            {proficiencyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleAddLanguage}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Language
          </button>
        </div>
      </div>

      {/* Selected Languages */}
      <div className="row mb-3 align-items-center">
        <div className="col">
          <div className="accordion">
            <div className="accordion-item">
              <h4 className="accordion-header">
                <button
                  className="accordion-button rounded-button"
                  type="button"
                >
                  Selected Languages
                </button>
              </h4>

              <div className="accordion-body">
                {languageData.map((language, index) => (
                  <LanguageItem
                    key={index}
                    language={language.language}
                    proficiency={language.proficiency}
                    onDelete={() => handleDeleteLanguage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Languages;
