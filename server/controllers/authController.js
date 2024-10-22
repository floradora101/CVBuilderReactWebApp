// controllers/authController.js
const bcrypt = require("bcrypt");
const { User } = require("../models");
const validator = require("validator");
const secretKey = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "20d" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
};

const register = async (req, res) => {
  try {
    const { password, firstName, lastName, email } = req.body;

    if (!password || !firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Use validator to check email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });

    const accessToken = generateAccessToken(user.id);
    res
      .status(201)
      .json({ message: "User registered successfully", accessToken });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
