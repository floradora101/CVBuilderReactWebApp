// NavigationCircles.js
import React from "react";

const NavigationCircles = ({ currentSection, setCurrentSection }) => {
  const handleSectionClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="section-flags">
      {[1, 2, 3, 4, 5, 6, 7].map((section) => (
        <div
          key={section}
          className={`section-flag ${
            currentSection === section ? "active" : ""
          }`}
          onClick={() => handleSectionClick(section)}
        >
          {section}
        </div>
      ))}
    </div>
  );
};

export default NavigationCircles;
