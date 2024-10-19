// routes/categories.js
const express = require("express");
const { Category } = require("../models/Category");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Middleware to authenticate all category routes
router.use(authenticateToken);

// Get all categories for the logged-in user
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.userId });
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({
      name,
      user: req.user.userId,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
});

module.exports = router;
