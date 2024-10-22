const submitFormData = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.userId; // Extract user ID from authentication header
    // Extract form data from request body
    const formData = req.body;

    const templateId = req.body.templateId;
    console.log(templateId);
    // Create CV record and associate it with the user
    const newCV = await CV.create({
      userId,
      templateId,
      color: formData.color,
      ...(formData.skillData && { skills: formData.skillData }),
      ...(formData.languageData && { languages: formData.languageData }),
    });

    // Create Education records if not null and associate them with the CV
    if (formData.educationData) {
      await Promise.all(
        formData.educationData.map(async (education) => {
          if (education) {
            await Education.create({ ...education, cvId: newCV.id });
          }
        })
      );
    }

    // Create Experience records if not null and associate them with the CV
    if (formData.experienceData) {
      await Promise.all(
        formData.experienceData.map(async (experience) => {
          if (experience) {
            await Experience.create({ ...experience, cvId: newCV.id });
          }
        })
      );
    }

    // Create PersonalDetails record if not null and associate it with the CV

    const personalDetails = {
      cvId: newCV.id,
      ...(formData.wantedJobTitle && {
        wantedJobTitle: formData.wantedJobTitle,
      }),
      ...(formData.firstName && { firstName: formData.firstName }),
      ...(formData.lastName && { lastName: formData.lastName }),
      ...(formData.email && { email: formData.email }),
      ...(formData.phone && { phone: formData.phone }),
      ...(formData.country && { country: formData.country }),

      ...(formData.city && { city: formData.city }),
      ...(formData.address && { address: formData.address }),
      ...(formData.postalCode && { postalCode: formData.postalCode }),
      ...(formData.drivingLicense && {
        drivingLicense: formData.drivingLicense,
      }),
      ...(formData.nationality && { nationality: formData.nationality }),
      ...(formData.dateOfBirth && { dateOfBirth: formData.dateOfBirth }),
      ...(formData.placeOfBirth && { placeOfBirthy: formData.placeOfBirth }),

      ...(formData.professionalSummary && {
        professionalSummary: formData.professionalSummary,
      }),
    };
    await PersonalDetails.create(personalDetails);

    // Create Reference records if not null and associate them with the CV
    if (formData.referenceData) {
      await Promise.all(
        formData.referenceData.map(async (reference) => {
          if (reference) {
            await Reference.create({
              employerName: reference.fullName, // Match the name with the database column
              company: reference.company,
              email: reference.email,
              phone: reference.phone,
              cvId: newCV.id,
            });
          }
        })
      );
    }
    // Create Section records if not null and associate them with the CV
    if (formData.sectionData) {
      await Promise.all(
        formData.sectionData.map(async (section) => {
          if (section) {
            await Section.create({
              sectionName: section.name, // Match the name with the database column
              sectionData: section.content, // Match the content with the database column
              cvId: newCV.id,
            });
          }
        })
      );
    }

    // Send a success response
    res
      .status(201)
      .json({ message: "Form data submitted successfully", newCV });
  } catch (error) {
    console.error("Error submitting form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCVById = async (req, res) => {
  try {
    const { cvId } = req.params;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(cvId);
    // const cvId = "10";

    // Find the CV by ID and include related data
    const cv = await CV.findByPk(cvId, {
      include: [
        { model: Education },
        { model: Experience },
        { model: PersonalDetails },
        { model: Reference },
        { model: Section },
      ],
    });

    if (!cv) {
      return res.status(404).json({ error: "CV not found" });
    }

    res.status(200).json({ cv });
  } catch (error) {
    console.error("Error fetching CV:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const {
  CV,
  Education,
  Experience,
  PersonalDetails,
  Reference,
  Section,
} = require("../models");

const getUserCVs = async (req, res) => {
  try {
    const user = req.user;
    // Fetch all CVs for the specified student along with related data
    const studentCVs = await CV.findAll({
      where: { userId: user.userId },
      include: [
        { model: Education },
        { model: Experience },
        { model: PersonalDetails },
        { model: Reference },
        { model: Section },
      ],
    });

    res.status(200).json({ studentCVs });
  } catch (error) {
    console.error("Error fetching student CVs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a CV by ID
const deleteCVById = async (req, res) => {
  try {
    const { cvId } = req.params;

    // Find the CV by ID
    const cv = await CV.findByPk(cvId);

    if (!cv) {
      return res.status(404).json({ error: "CV not found" });
    }

    // Delete related records first due to foreign key constraints
    await Education.destroy({ where: { cvId } });
    await Experience.destroy({ where: { cvId } });
    await PersonalDetails.destroy({ where: { cvId } });
    await Reference.destroy({ where: { cvId } });
    await Section.destroy({ where: { cvId } });

    // Delete the CV
    await cv.destroy();

    res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error("Error deleting CV:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to edit a CV by ID
const editCVById = async (req, res) => {
  try {
    const { cvId } = req.params;
    const formData = req.body;

    // Find the CV by ID
    const cv = await CV.findByPk(cvId);

    if (!cv) {
      return res.status(404).json({ error: "CV not found" });
    }

    // Update CV fields
    await cv.update({
      color: formData.color,
      ...(formData.skillsData && { skills: formData.skillsData }),
      ...(formData.languageData && { languages: formData.languageData }),
    });

    // Update PersonalDetails
    // Update PersonalDetails
    const personalDetails = await PersonalDetails.findOne({ where: { cvId } });
    if (personalDetails) {
      await personalDetails.update({
        ...(formData.wantedJobTitle && {
          wantedJobTitle: formData.wantedJobTitle,
        }),
        ...(formData.firstName && { firstName: formData.firstName }),
        ...(formData.lastName && { lastName: formData.lastName }),
        ...(formData.email && { email: formData.email }),
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.country && { country: formData.country }),
        ...(formData.city && { city: formData.city }),
        ...(formData.address && { address: formData.address }),
        ...(formData.postalCode && { postalCode: formData.postalCode }),
        ...(formData.drivingLicense && {
          drivingLicense: formData.drivingLicense,
        }),
        ...(formData.nationality && { nationality: formData.nationality }),
        ...(formData.dateOfBirth && { dateOfBirth: formData.dateOfBirth }),
        ...(formData.placeOfBirth && { placeOfBirth: formData.placeOfBirth }),
        ...(formData.professionalSummary && {
          professionalSummary: formData.professionalSummary,
        }),
      });
    }

    // Update or create Education records
    if (formData.educationData) {
      await Education.destroy({ where: { cvId } });
      await Promise.all(
        formData.educationData.map(async (education) => {
          if (education) {
            await Education.create({ ...education, cvId });
          }
        })
      );
    }

    // Update or create Experience records
    if (formData.experienceData) {
      await Experience.destroy({ where: { cvId } });
      await Promise.all(
        formData.experienceData.map(async (experience) => {
          if (experience) {
            await Experience.create({ ...experience, cvId });
          }
        })
      );
    }

    // Update or create Reference records
    if (formData.referenceData) {
      await Reference.destroy({ where: { cvId } });
      await Promise.all(
        formData.referenceData.map(async (reference) => {
          if (reference) {
            await Reference.create({
              employerName: reference.fullName,
              company: reference.company,
              email: reference.email,
              phone: reference.phone,
              cvId,
            });
          }
        })
      );
    }

    // Update or create Section records
    if (formData.sectionData) {
      await Section.destroy({ where: { cvId } });
      await Promise.all(
        formData.sectionData.map(async (section) => {
          if (section) {
            await Section.create({
              sectionName: section.name,
              sectionData: section.content,
              cvId,
            });
          }
        })
      );
    }

    res.status(200).json({ message: "CV updated successfully" });
  } catch (error) {
    console.error("Error editing CV:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  submitFormData,
  getUserCVs,
  deleteCVById,
  editCVById,
  getCVById,
};
