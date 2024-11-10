// Helper to display or hide dashboard
function toggleDashboard(show) {
  document.getElementById("dashboard").style.display = show ? "block" : "none";
  document.getElementById("auth-section").style.display = show ? "none" : "block";
}

// Login Handler
document.getElementById("auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulate an authentication check
  const isAuthenticated = await authenticateUser(username, password);
  if (isAuthenticated) toggleDashboard(true);
  else alert("Login failed. Try again.");
});

// Task Form Handler
document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskData = {
    title: document.getElementById("task-title").value,
    description: document.getElementById("task-desc").value,
    deadline: document.getElementById("task-deadline").value,
    priority: document.getElementById("task-priority").value,
  };
  await addTask(taskData);
  displayTasks();
  e.target.reset();
});

// Fetch API calls
async function authenticateUser(username, password) {
  try {
    // Fake authentication call (replace with actual API call)
    return username === "user" && password === "pass";
  } catch (error) {
    console.error("Error authenticating:", error);
    return false;
  }
}

async function addTask(taskData) {
  try {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function displayTasks() {
  try {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Deadline: ${task.deadline}</p>
        <p>Priority: ${task.priority}</p>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    displayTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Filtering and Searching
document.getElementById("filter-priority").addEventListener("change", displayTasks);
document.getElementById("search-bar").addEventListener("input", displayTasks);
