import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap"; // Import Bootstrap Collapse

const SectionItem = ({ section, onChange, onDelete, isOpen, onClick }) => (
  <div className="row align-items-center mb-3">
    <div className="col">
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`rounded-button accordion-button ${
                isOpen ? "" : "collapsed"
              }`}
              type="button"
              onClick={onClick}
            >
              {section.name}
            </button>
          </h2>
          <Collapse in={isOpen}>
            <div
              className={`accordion-collapse ${
                isOpen ? "collapse show" : "collapse"
              }`}
            >
              <div className="accordion-body">
                <div className="row align-items-center mb-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor={`name-${section.id}`}>
                        Section Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`name-${section.id}`}
                        value={section.name}
                        onChange={(e) =>
                          onChange(section.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`content-${section.id}`}>Content:</label>
                      <textarea
                        className="form-control"
                        id={`content-${section.id}`}
                        value={section.content}
                        onChange={(e) =>
                          onChange(section.id, "content", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
    <div className="col-auto">
      <button className="btn btn-sm rounded-button" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  </div>
);

const Finish = ({ formData, updateFormData }) => {
  const sections = formData.sectionData || [];
  const [openIndex, setOpenIndex] = useState(-1);

  const handleAddSection = () => {
    const newSection = {
      id: sections.length,
      name: "Section",
      content: "",
    };
    updateFormData({ sectionData: [...sections, newSection] });
    setOpenIndex(sections.length); // Open the newly added section
  };

  const handleDeleteSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    updateFormData({ sectionData: updatedSections });
    setOpenIndex(-1);
  };

  const handleChange = (id, fieldName, value) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, [fieldName]: value } : section
    );
    updateFormData({ sectionData: updatedSections });
  };

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div>
      <h2 className="title">Customize Sections</h2>

      {/* Selected Sections */}
      <div className="row mb-3 align-items-center">
        <div className="col">
          {sections.map((section, index) => (
            <SectionItem
              key={section.id}
              section={section}
              onChange={handleChange}
              onDelete={() => handleDeleteSection(section.id)}
              isOpen={openIndex === index}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>

      {/* Add Section Button */}
      <div className="mt-3 mb-3">
        <button className="btn rounded-button" onClick={handleAddSection}>
          <FontAwesomeIcon icon={faPlus} /> Add Section
        </button>
      </div>
    </div>
  );
};

export default Finish;
