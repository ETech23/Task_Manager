const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, username, password, occupation } = req.body;

    // Check if the user already exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword, occupation });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed due to server error." });
  }
};

// Log in an existing user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username);

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Login failed: User not found for username:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("User found:", user.username);

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Login failed: Incorrect password for username:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("Password verified for username:", username);

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("JWT token generated for user:", username);

    // Set the token in a secure HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        maxAge: 3600000, // 1 hour
      })
      .json({ message: "Login successful" });
    console.log("Login successful for user:", username);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed due to server error." });
  }
};

// Check authentication status
exports.checkAuth = (req, res) => {
  try {
    const token = req.cookies.token; // Requires cookie-parser middleware
    if (!token) {
      return res.status(401).json({ loggedIn: false });
    }
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ loggedIn: true });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(401).json({ loggedIn: false });
  }
};

