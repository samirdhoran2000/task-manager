// routes/tasks.js
const express = require("express");
const { Task } = require("../models/Task");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Middleware to authenticate all task routes
router.use(authenticateToken);

// Get filtered tasks for the logged-in user
router.get("/", async (req, res) => {
  try {
    const { status, category, dueDate } = req.query;

    // Build dynamic filter object
    let filter = { user: req.user.userId };

    if (status) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    if (dueDate) {
      filter.dueDate = { $gte: new Date(dueDate).setHours(0, 0, 0, 0) }; // Get tasks due on or after this date
    }

    const tasks = await Task.find(filter).populate("category");
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
});
// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, status, dueDate, category } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      category,
      user: req.user.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate, category } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { title, description, status, dueDate, category },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
});

module.exports = router;
