import React from "react";

const CVCard = ({ cv, onDelete, onEdit }) => {
  const handleDelete = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this CV?"
    );
    if (isConfirmed) {
      // Call the onDelete function passed from the parent component
      onDelete();
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ cursor: "pointer" }}>
        <img className="card-img-top" />

        <div className="card-body">
          <h5 className="card-title">
            {cv.PersonalDetail.wantedJobTitle
              ? cv.PersonalDetail.wantedJobTitle
              : "Default Title"}
          </h5>

          {/* Edit button */}
          <button className="btn btn-primary me-2" onClick={onEdit}>
            Edit
          </button>
          {/* Delete button */}
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVCard;

// import React, { useState } from "react";

// const CVCard = ({ cv, onDelete, onEdit }) => {
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const handleDelete = () => {
//     console.log("hiiiiiiiiii")
//     setShowConfirmation(true);
//   };

//   const confirmDelete = () => {
//     onDelete(); // Call the onDelete function passed from the parent component
//     setShowConfirmation(false);
//   };

//   const cancelDelete = () => {
//     setShowConfirmation(false);
//   };

//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card" style={{ cursor: "pointer" }}>
//         {/* <img src={cv.imageUrl} className="card-img-top" alt={cv.name} /> */}
//         <img className="card-img-top" />

//         <div className="card-body">
//           {/* <h5 className="card-title">
//             {cv.PersonalDetail.wantedJobTitle
//               ? cv.PersonalDetail.wantedJobTitle
//               : "Default Title"}
//           </h5> */}
//           <h5 className="card-title">"Default Title"</h5>

//           {/* Edit button */}
//           <button className="btn btn-primary me-2" onClick={onEdit}>
//             Edit
//           </button>
//           {/* Delete button */}
//           <button className="btn btn-danger" onClick={handleDelete}>
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* Delete confirmation modal */}
//       {showConfirmation && (
//         <div className="modal">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Delete</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={cancelDelete}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete this CV?</p>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={cancelDelete}>
//                   Cancel
//                 </button>
//                 <button className="btn btn-danger" onClick={confirmDelete}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CVCard;
