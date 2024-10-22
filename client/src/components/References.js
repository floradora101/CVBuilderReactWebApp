import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReferenceItem = ({ reference, onChange, onDelete }) => (
  <div className="row align-items-center mb-3">
    <div className="col">
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="rounded-button accordion-button" type="button">
              Reference
            </button>
          </h2>
          <div className="accordion-collapse collapse show">
            <div className="accordion-body">
              <div className="row align-items-center mb-3">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor={`fullName-${reference.id}`}>
                      Full Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`fullName-${reference.id}`}
                      value={reference.fullName}
                      onChange={(e) =>
                        onChange(reference.id, "fullName", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`company-${reference.id}`}>Company:</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`company-${reference.id}`}
                      value={reference.company}
                      onChange={(e) =>
                        onChange(reference.id, "company", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor={`email-${reference.id}`}>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id={`email-${reference.id}`}
                      value={reference.email}
                      onChange={(e) =>
                        onChange(reference.id, "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`phone-${reference.id}`}>Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      id={`phone-${reference.id}`}
                      value={reference.phone}
                      onChange={(e) =>
                        onChange(reference.id, "phone", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

const References = ({ formData, updateFormData }) => {
  const [references, setReferences] = useState(formData.referenceData || []);

  const handleAddReference = () => {
    const newReference = {
      id: references.length,
      fullName: "",
      company: "",
      email: "",
      phone: "",
    };
    setReferences([...references, newReference]);
    updateFormData({ referenceData: [...references, newReference] });
  };

  const handleDeleteReference = (id) => {
    const updatedReferences = references.filter(
      (reference) => reference.id !== id
    );
    setReferences(updatedReferences);
    updateFormData({ referenceData: updatedReferences });
  };

  const handleChange = (id, fieldName, value) => {
    const updatedReferences = references.map((reference) =>
      reference.id === id ? { ...reference, [fieldName]: value } : reference
    );
    setReferences(updatedReferences);
    updateFormData({ referenceData: updatedReferences });
  };

  return (
    <div>
      <h2 className="title">References</h2>
      {references.map((reference) => (
        <ReferenceItem
          key={reference.id}
          reference={reference}
          onChange={handleChange}
          onDelete={() => handleDeleteReference(reference.id)}
        />
      ))}
      <button className="btn rounded-button" onClick={handleAddReference}>
        <FontAwesomeIcon icon={faPlus} /> Add Reference
      </button>
    </div>
  );
};

export default References;
