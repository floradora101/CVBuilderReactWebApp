// export default FormPage;
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Languages from "./Languages";
import References from "./References";
import Finish from "./Finish";
import NavigationCircles from "./NavigationCircles";
import CVPreview from "./CVPreview";
import CVPreviewTwo from "./CVPreviewTwo";
const FormPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const savedFormData = localStorage.getItem(`formData_${userId}`);
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [userId]);

  const saveFormDataToLocalStorage = (data) => {
    if (userId) {
      localStorage.setItem(`formData_${userId}`, JSON.stringify(data));
    }
  };

  const handleNext = () => {
    setCurrentSection((prevSection) => Math.min(prevSection + 1, 7));
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 1));
  };

  const updateFormData = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    saveFormDataToLocalStorage(updatedData);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submissionData = { ...formData, templateId };

      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:5000/cv/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        navigate("/templates", {
          state: {
            message: "Form data submitted successfully!",
            type: "success",
          },
        });
        console.log("Form data submitted successfully!");
      } else {
        navigate("/templates", {
          state: { message: "Failed to submit form data.", type: "error" },
        });
        console.error("Failed to submit form data.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDownloadPDF = () => {
    const input = document.querySelector(".blank-sheet");

    const scale = 6; // Keep the scale high for better quality
    html2canvas(input, { scale })
      .then((canvas) => {
        // Convert canvas to JPEG image
        const imgData = canvas.toDataURL("image/jpeg", 0.8); // Adjust quality if needed

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 210;
        const pdfHeight = 297;

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let position = 0;
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        ); // Use compression

        pdf.save("cv.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <div className="text-center mb-4 mt-4">
            <NavigationCircles
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />
          </div>
          {currentSection === 1 && (
            <PersonalInfo formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 2 && (
            <Education formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 3 && (
            <Experience formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 4 && (
            <Skills formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 5 && (
            <Languages formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 6 && (
            <References formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 7 && (
            <Finish formData={formData} updateFormData={updateFormData} />
          )}
          <div className="text-center mt-4">
            {currentSection > 1 && (
              <button
                className="btn rounded-button btn-secondary me-2"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            {currentSection < 7 && (
              <button
                className="btn rounded-button btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {currentSection === 7 && (
              <button
                className="btn rounded-button btn-success ms-2"
                onClick={handleSubmit} // Call the handleSubmit function on button click
                disabled={isSubmitting} // Disable the button while submitting
              >
                {isSubmitting ? "Submitting..." : "Finish"}
              </button>
            )}
          </div>
        </div>
        <div className="col-md-7 cv-preview">
          <div className="justify-content-end d-flex">
            <button
              className="btn rounded-button btn-info mb-2"
              onClick={handleDownloadPDF}
            >
              Download as PDF
            </button>
          </div>

          {templateId === "2" ? (
            <CVPreviewTwo
              formData={formData}
              educationData={formData.educationData}
              experienceData={formData.experienceData}
              languageData={formData.languageData}
              skillData={formData.skillData}
              referenceData={formData.referenceData}
              sectionData={formData.sectionData}
            />
          ) : (
            <CVPreview
              formData={formData}
              educationData={formData.educationData}
              experienceData={formData.experienceData}
              languageData={formData.languageData}
              skillData={formData.skillData}
              referenceData={formData.referenceData}
              sectionData={formData.sectionData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;

// const FormPage = () => {
//   const { templateId } = useParams();
//   const navigate = useNavigate();
//   const [currentSection, setCurrentSection] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

//   useEffect(() => {
//     // Load form data from localStorage if available
//     const savedFormData = localStorage.getItem("formData");
//     if (savedFormData) {
//       setFormData(JSON.parse(savedFormData));
//     }
//   }, []);

//   const saveFormDataToLocalStorage = (data) => {
//     localStorage.setItem("formData", JSON.stringify(data));
//   };

//   const handleNext = () => {
//     setCurrentSection((prevSection) => Math.min(prevSection + 1, 7));
//   };

//   const handlePrevious = () => {
//     setCurrentSection((prevSection) => Math.max(prevSection - 1, 1));
//   };

//   const updateFormData = (data) => {
//     const updatedData = { ...formData, ...data };
//     setFormData(updatedData);
//     saveFormDataToLocalStorage(updatedData);
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       // Include the templateId in the formData
//       const submissionData = { ...formData, templateId };

//       // Send formData to the backend
//       const accessToken = localStorage.getItem("accessToken");

//       const response = await fetch("http://localhost:5000/cv/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(submissionData),
//       });
//       if (response.ok) {
//         // Handle successful response
//         navigate("/templates", {
//           state: {
//             message: "Form data submitted successfully!",
//             type: "success",
//           },
//         });
//         console.log("Form data submitted successfully!");
//       } else {
//         // Handle error response
//         navigate("/templates", {
//           state: { message: "Failed to submit form data.", type: "error" },
//         });
//         console.error("Failed to submit form data.");
//       }
//     } catch (error) {
//       // Handle fetch error
//       console.error("Error submitting form data:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   const handleDownloadPDF = () => {
//     const input = document.querySelector(".blank-sheet");

//     const scale = 5; // Increase the scale for higher resolution
//     html2canvas(input, { scale })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");

//         // A4 dimensions in mm
//         const pdfWidth = 210;
//         const pdfHeight = 297;

//         // Calculate the dimensions of the image in the PDF
//         const imgWidth = pdfWidth;
//         const imgHeight = (canvas.height * pdfWidth) / canvas.width;

//         // Add the image to the PDF
//         let position = 0;
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

//         // If the image height is larger than the page height, add more pages
//         // let heightLeft = imgHeight;
//         // while (heightLeft > pdfHeight) {
//         //   position -= pdfHeight;
//         //   heightLeft -= pdfHeight;
//         //   pdf.addPage();
//         //   pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         // }

//         pdf.save("cv.pdf");
//       })
//       .catch((error) => {
//         console.error("Error generating PDF:", error);
//       });
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-5">
//           <div className="text-center mb-4 mt-4">
//             <NavigationCircles
//               currentSection={currentSection}
//               setCurrentSection={setCurrentSection}
//             />
//           </div>
//           {currentSection === 1 && (
//             <PersonalInfo formData={formData} updateFormData={updateFormData} />
//           )}
//           {currentSection === 2 && (
//             <Education formData={formData} updateFormData={updateFormData} />
//           )}
//           {currentSection === 3 && (
//             <Experience formData={formData} updateFormData={updateFormData} />
//           )}
//           {currentSection === 4 && (
//             <Skills formData={formData} updateFormData={updateFormData} />
//           )}
//           {currentSection === 5 && (
//             <Languages formData={formData} updateFormData={updateFormData} />
//           )}
//           {currentSection === 6 && (
//             <References formData={formData} updateFormData={updateFormData} />
//           )}
//           {currentSection === 7 && (
//             <Finish formData={formData} updateFormData={updateFormData} />
//           )}
//           <div className="text-center mt-4">
//             {currentSection > 1 && (
//               <button
//                 className="btn rounded-button btn-secondary me-2"
//                 onClick={handlePrevious}
//               >
//                 Previous
//               </button>
//             )}
//             {currentSection < 7 && (
//               <button
//                 className="btn rounded-button btn-primary"
//                 onClick={handleNext}
//               >
//                 Next
//               </button>
//             )}
//             {currentSection === 7 && (
//               <button
//                 className="btn rounded-button btn-success ms-2"
//                 onClick={handleSubmit} // Call the handleSubmit function on button click
//                 disabled={isSubmitting} // Disable the button while submitting
//               >
//                 {isSubmitting ? "Submitting..." : "Finish"}
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="col-md-7 cv-preview">
//           <div className="justify-content-end d-flex">
//             {" "}
//             <button
//               className="btn rounded-button btn-info mb-2"
//               onClick={handleDownloadPDF}
//             >
//               Download as PDF
//             </button>
//           </div>

//           {templateId === "2" ? (
//             <CVPreviewTwo
//               formData={formData}
//               educationData={formData.educationData}
//               experienceData={formData.experienceData}
//               languageData={formData.languageData}
//               skillData={formData.skillData}
//               referenceData={formData.referenceData}
//               sectionData={formData.sectionData}
//             />
//           ) : (
//             <CVPreview
//               formData={formData}
//               educationData={formData.educationData}
//               experienceData={formData.experienceData}
//               languageData={formData.languageData}
//               skillData={formData.skillData}
//               referenceData={formData.referenceData}
//               sectionData={formData.sectionData}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormPage;
