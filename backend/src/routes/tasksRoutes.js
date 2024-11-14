import express from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controller/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only logged users can access task management routes
router.post("/task/save", protect, createTask);
router.get("/tasks", protect, getTasks);
router.get("/task/:id", protect, getTask);
router.patch("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask)

export default router;

