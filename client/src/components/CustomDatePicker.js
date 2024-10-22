import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selectedDate, onChange, isPresent, onPresentChange, isEndDate }) => (
  <div className="d-flex align-items-center">
    <DatePicker
      className="form-control me-2"
      selected={selectedDate}
      onChange={onChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      disabled={isPresent}
    />
    {/* Render the checkbox only if it's for the end date */}
    {isEndDate && (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isPresent}
          onChange={onPresentChange}
        />
        <label className="form-check-label">Present</label>
      </div>
    )}
  </div>
);

export default CustomDatePicker;
