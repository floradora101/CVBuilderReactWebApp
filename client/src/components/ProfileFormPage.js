import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const initialFormData = {
  country: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  drivingLicense: "",
  nationality: "",
  dateOfBirth: "",
  placeOfBirth: "",
  color: "",
  professionalSummary: "",
  wantedJobTitle: "",
  educationData: [],
  experienceData: [],
  languageData: [],
  skillData: [],
  referenceData: [],
};

const ProfileFormPage = () => {
  const { cvId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(initialFormData);
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:5000/cv/view/${cvId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData({
            country: data.cv.PersonalDetail?.country || "",
            email: data.cv.PersonalDetail?.email || "",
            firstName: data.cv.PersonalDetail?.firstName || "",
            lastName: data.cv.PersonalDetail?.lastName || "",
            phone: data.cv.PersonalDetail?.phone || "",
            professionalSummary:
              data.cv.PersonalDetail?.professionalSummary || "",
            wantedJobTitle: data.cv.PersonalDetail?.wantedJobTitle || "",
            city: data.cv.PersonalDetail?.city || "",
            address: data.cv.PersonalDetail?.address || "",
            postalCode: data.cv.PersonalDetail?.postalCode || "",
            drivingLicense: data.cv.PersonalDetail?.drivingLicense || "",
            nationality: data.cv.PersonalDetail?.nationality || "",
            dateOfBirth: data.cv.PersonalDetail?.dateOfBirth || "",
            placeOfBirth: data.cv.PersonalDetail?.placeOfBirth || "",
            color: data.cv.color || "",
            educationData: data.cv.Education || [],
            experienceData: data.cv.Experiences || [],
            languageData: data.cv.languages || [],
            skillData: data.cv.skills || [],
            referenceData: data.cv.References || [],
          });
        } else {
          console.error("Failed to fetch CV data.");
        }
      } catch (error) {
        console.error("Error fetching CV data:", error);
      }
    };
    fetchCVData();
  }, [cvId]);

  const updateFormData = (updatedData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...updatedData,
    }));
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`http://localhost:5000/CV/${cvId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("CV data updated successfully!");
        navigate("/profile", {
          state: { message: "CV data updated successfully!", type: "success" },
        });
      } else {
        console.error("Failed to update CV data.");
        navigate("/profile", {
          state: { message: "Failed to update CV data.", type: "error" },
        });
      }
    } catch (error) {
      console.error("Error updating CV data:", error);
      navigate("/profile", {
        state: { message: "Error updating CV data.", type: "error" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setCurrentSection((prevSection) => Math.min(prevSection + 1, 7));
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 1));
  };

  const handleDownloadPDF = () => {
    const input = document.querySelector(".blank-sheet");

    const scale = 6; // Increase the scale for higher resolution
    html2canvas(input, { scale })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
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
            <Education
              formData={formData}
              updateFormData={updateFormData}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          )}
          {currentSection === 3 && (
            <Experience
              formData={formData}
              updateFormData={updateFormData}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          )}
          {currentSection === 4 && (
            <Skills formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 5 && (
            <Languages formData={formData} updateFormData={updateFormData} />
          )}
          {currentSection === 6 && (
            <References
              formData={formData}
              updateFormData={updateFormData}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
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
                onClick={() => handleSubmit(formData)}
                disabled={isSubmitting}
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
          {location.state.templateId === 2 ? (
            <CVPreviewTwo formData={formData} />
          ) : (
            <CVPreview formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFormPage;
