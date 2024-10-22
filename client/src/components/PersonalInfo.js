import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const PersonalInfo = ({ formData, updateFormData }) => {
  const [summaryLength, setSummaryLength] = useState(
    formData.professionalSummary ? formData.professionalSummary.length : 0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formDataUpdate = {
      ...formData,
      [name]: value,
    };
    updateFormData(formDataUpdate);
    if (name === "professionalSummary") {
      setSummaryLength(value.length);
    }
  };

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  const getEmoji = () => {
    if (summaryLength >= 50 && summaryLength <= 200) {
      return "❤️";
    } else {
      return "😠";
    }
  };

  return (
    <div>
      <h2 className="title">Personal Info</h2>
      <form>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="color" className="form-label">
              Choose a Color
            </label>
            <select
              name="color"
              id="color"
              className="form-control"
              value={formData.color} // Assuming formData has a color property
              onChange={handleChange}
            >
              <option value="">-- Choose a Color --</option>
              <option value="#A7C7E7" style={{ backgroundColor: "#A7C7E7" }}>
                Light Blue
              </option>
              <option value="#000080" style={{ backgroundColor: "#000080" }}>
                Dark Blue
              </option>
              <option value="#FFD580" style={{ backgroundColor: "#FFD580" }}>
                Orange
              </option>
              <option value="#9FE2BF" style={{ backgroundColor: "#9FE2BF" }}>
                Green
              </option>
              <option value="#ffcff1" style={{ backgroundColor: "#ffcff1" }}>
                Pink
              </option>
              <option value="#E0B0FF" style={{ backgroundColor: "#E0B0FF" }}>
                Purple
              </option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="wantedJobTitle" className="form-label">
              Wanted Job Title
            </label>
            <input
              type="text"
              name="wantedJobTitle"
              id="wantedJobTitle"
              placeholder="Wanted Job Title (e.g. Teacher)"
              className="form-control"
              value={formData.wantedJobTitle}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="postalCode" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              placeholder="Postal Code"
              className="form-control"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="drivingLicense" className="form-label">
              Driving License
              <span
                className="ms-1"
                data-bs-toggle="tooltip"
                title="Do not include your driving license unless the job requires it"
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </label>
            <input
              type="text"
              name="drivingLicense"
              id="drivingLicense"
              placeholder="Driving License"
              className="form-control"
              value={formData.drivingLicense}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="nationality" className="form-label">
              Nationality
              <span
                className="ms-1"
                data-bs-toggle="tooltip"
                title="Do not include your nationality unless the job requires it"
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              placeholder="Nationality"
              className="form-control"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="placeOfBirth" className="form-label">
              Place Of Birth
            </label>
            <input
              type="text"
              name="placeOfBirth"
              id="placeOfBirth"
              placeholder="Place Of Birth"
              className="form-control"
              value={formData.placeOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date Of Birth
              <span
                className="ms-1"
                data-bs-toggle="tooltip"
                title="Do not include your date of birth unless the job some age range criteria"
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date Of Birth"
              className="form-control"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="professionalSummary" className="form-label">
              Professional Summary
            </label>
            <textarea
              name="professionalSummary"
              id="professionalSummary"
              placeholder="Write 2-4 short & energetic sentences to interest the reader!"
              className="form-control"
              rows="4"
              value={formData.professionalSummary}
              onChange={handleChange}
            ></textarea>
            <div className="d-flex justify-content-between">
              <small className="form-text text-muted">
                {summaryLength} / 200
              </small>
              <small className="form-text text-muted">
                Recruiter tip: write 50-200 characters to increase interview
                chances
              </small>
              <span>{getEmoji()}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
