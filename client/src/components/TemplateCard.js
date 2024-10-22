// import React from "react";

// const TemplateCard = ({ template, selectTemplate }) => {
//   return (
//     <div className="col-md-4 mb-4">
//       <div
//         className="card"
//         style={{ cursor: "pointer" }}
//         onClick={() => selectTemplate(template)}
//       >
//         <img
//           src={template.imageUrl}
//           className="card-img-top"
//           alt={template.name}
//         />
//         <div className="card-body">
//           <h5 className="card-title">{template.name}</h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateCard;
// TemplateCard.js
import React from "react";
import { Link } from "react-router-dom";

const TemplateCard = ({ template }) => {
  return (
    <div className="col-md-4 mb-4">
      <Link to={`/templates/${template.id}`} style={{ textDecoration: "none" }}>
        <div className="card" style={{ cursor: "pointer" }}>
          <img
            src={template.imageUrl}
            className="card-img-top"
            alt={template.name}
          />
          <div className="card-body">
            <h5 className="card-title">{template.name}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TemplateCard;
