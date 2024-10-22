// routes/formRoutes.js
const express = require("express");
const cvController = require("../controllers/cvController");

const router = express.Router();

// Route to handle adding form data to the database
router.post("/submit", cvController.submitFormData);
// Route to fetch all CVs for a specific user
router.get("/user", cvController.getUserCVs);
// Route to delete a CV by ID
router.delete("/:cvId", cvController.deleteCVById);

// Route to edit a CV by ID
router.put("/:cvId/edit", cvController.editCVById);
router.get('/view/:cvId', cvController.getCVById);


module.exports = router;


