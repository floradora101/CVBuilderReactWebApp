import React, { useState } from "react";
import TemplateCard from "./TemplateCard";
import { useLocation } from "react-router-dom";
const Templates = () => {
  // Sample template data
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Template 1",
      imageUrl:  "../images/template1.jpg",
    },
    {
      id: 2,
      name: "Template 2",
      imageUrl:  "../images/template2.jpg",
    },
    // Add more templates as needed
  ]);

  const location = useLocation(); // Retrieve the location object
  // Extract the message from location.state
  const { state } = location;
  const message = state?.message;
  const messageType = state?.type;
  const selectTemplate = (selectedTemplate) => {
    // Handle selecting a template (e.g., navigate to another page)
    console.log("Selected template:", selectedTemplate);
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Choose a Template</h2>
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
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selectTemplate={selectTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default Templates;
