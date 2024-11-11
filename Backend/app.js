const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");  // Import cookie-parser
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,    // Allow requests from your frontend domain
  credentials: true,                 // Allow credentials (cookies) in CORS
}));
app.use(express.json());
app.use(cookieParser());              // Use cookie-parser to handle cookies

// Route Imports
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;

