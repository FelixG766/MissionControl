import express from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../task/taskController.js";

const router = express.Router();

router.post("/task/save", createTask);
router.get("/tasks", getTasks);
router.get("/task/:id", getTask);
router.patch("/task/:id", updateTask);
router.delete("/task/:id", deleteTask)

export default router;

