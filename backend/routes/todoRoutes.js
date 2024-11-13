import express from "express";
import Todo from "../models/Todo.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Create Todo
router.post("/", authMiddleware, async (req, res) => {
  const newTodo = new Todo({
    userId: req.user.id,
    ...req.body,
  });
  await newTodo.save();
  res.send("Todo created");
});

// Get Todos
router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

// Update Todo
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedTodo);
});

// Delete Todo
router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Todo deleted");
});

export default router;
