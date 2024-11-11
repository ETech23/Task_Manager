const express = require("express");
const { register, login, checkAuth } = require("../controllers/authController");

const router = express.Router();

// Registration route
router.post("/register", register);

// Login route
router.post("/login", login);

// Check authentication status route
router.get("/status", checkAuth);

module.exports = router;

