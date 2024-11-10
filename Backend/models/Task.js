// models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  deadline: Date,
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
});

module.exports = mongoose.model("Task", TaskSchema);

