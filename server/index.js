require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const express = require("express");
const db = require("./models");
const cors = require("cors");
// Import routes
const authRoutes = require("./routes/authRoutes");
// Add more route imports if you have additional routes
const cvRoutes = require("./routes/cvRoutes");
// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000; // Set the port
const jwt = require("jsonwebtoken");
// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to the database
db.sequelize
  .authenticate({ force: false })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
 
    req.user = user;
    next();
  });
};

// Define routes
app.use("/api", authRoutes);
// Protected routes - requires authentication
// app.use("/conversations", authenticateToken, conversationRoutes);
app.use("/cv", authenticateToken, cvRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
