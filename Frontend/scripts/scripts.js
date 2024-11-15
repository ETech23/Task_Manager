// Define the backend base URL for Fly.io
const API_BASE_URL ="https://backend-white-frog-846.fly.dev";

// Handle Login Form Submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const isAuthenticated = await authenticateUser(username, password);
  if (isAuthenticated) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    toggleTaskForm(true); // Show task form now that the user is logged in
  } else {
    alert("Login failed. Please check your credentials and try again.");
  }
});


// Toggle between Login and Sign-Up Forms
function toggleAuthForm() {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const authTitle = document.getElementById("auth-title");
  const toggleAuthText = document.getElementById("toggle-auth");

  if (loginForm.style.display === "none") {
    // Switch to Login Form
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    authTitle.textContent = "Login";
    toggleAuthText.innerHTML = `Don't have an account? <a href="#" onclick="toggleAuthForm()">Sign Up</a>`;
  } else {
    // Switch to Sign-Up Form
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    authTitle.textContent = "Sign Up";
    toggleAuthText.innerHTML = `Already have an account? <a href="#" onclick="toggleAuthForm()">Login</a>`;
  }
}

// Handle Sign-Up Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const occupation = document.getElementById("signup-occupation").value;

  const isRegistered = await registerUser({ email, username, password, occupation });
  if (isRegistered) {
    alert("Registration successful! Please log in.");
    toggleAuthForm(); // Switch to login form after successful registration
  } else {
    alert("Registration failed. Please try again.");
  }
});

// Check if the user is logged in on page load
async function checkAuthStatus() {
  const isAuthenticated = await fetchAuthStatus();
  toggleTaskForm(isAuthenticated);
}

// Display task form only if the user is authenticated
function toggleTaskForm(show) {
  document.getElementById("task-form").style.display = show ? "block" : "none";
  document.getElementById("auth-button").style.display = show ? "none" : "block";
}

// API calls to backend

async function fetchAuthStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/status`, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
    });

    // Check if the response status is OK
    if (!response.ok) {
      console.error("Error: Failed to fetch auth status with status", response.status);
      return false;
    }

    // Check if the response has content before parsing
    const text = await response.text();
    if (!text) {
      console.error("Error: Empty response body");
      return false;
    }

    // Parse JSON response
    const data = JSON.parse(text);
    return data.loggedIn;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
}

// Authenticate user login
async function authenticateUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies for session management
      body: JSON.stringify({ username, password })
    });
    return response.ok;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
}

// Show the authentication section and hide the dashboard
function showAuthSection() {
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

// Register a new user
async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.ok;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
}

// Initialize the page by checking authentication status on load
document.addEventListener("DOMContentLoaded", checkAuthStatus);