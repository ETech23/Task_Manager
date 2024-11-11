// Define the backend base URL for Fly.io
const API_BASE_URL =" https://backend-white-frog-846.fly.dev";

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

// Fetch authentication status
async function fetchAuthStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/status`, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
    });
    const data = await response.json();
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

