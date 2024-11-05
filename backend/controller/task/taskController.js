import asyncHandler from "express-async-handler";
import { isEmptyString } from "../../helpers/validation/generalValidation.js";
import TaskModel from "../../modules/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {

    try {
        const { title, description, dueDate, completed, priority, status } = req.body;

        if (isEmptyString(title)) {
            res.status(400).json({ message: "Title is required" });
        }

        if (isEmptyString(description)) {
            res.status(400).json({ message: "Description is required" });
        }

        const task = new TaskModel({
            title, description, dueDate, completed, priority, status, user: req.user._id,
        })

        await task.save();
        res.status(201).json(task);

    } catch (error) {
        console.log(`Failed to create tasks, ${error.message}`);
        res.status(500).json({ message: `Failed to create tasks, ${error.message}` });
    }

});

export const getTasks = asyncHandler(async (req, res) => {
    try {
        const userId = req.user_id;

        if (!userId) {
            res.status(400).json({ message: "User not found" });
        }

        const tasks = await TaskModel.find({ user: userId });
        res.status(200).json({
            size: tasks.length,
            tasks
        });

    } catch (error) {
        console.log(`Failed to get tasks, ${error.message}`);
        res.status(500).json({ message: `Failed to get tasks. Error: ${error.message}` });
    }
});

export const getTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user_id;
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "No task id is provided." })
        }

        const task = await TaskModel.findById(id);

        if (!task) {
            res.status(400).json({ message: "Task not found." });
        }

        if (!task.user._id.equals(userId)) {
            res.status(400).json({ message: "Not authorised." });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(400).json({ meassage: `Error in getting task. Error: ${error.message}` });
    }
});

export const updateTask = asyncHandler(async (req, res) => {

    try {
        const userId = req.user_id;

        const { id } = req.params;

        const { title, description, dueDate, priority, status, completed } = req.body;

        const task = await TaskModel.findById(id);

        if (!task) {
            res.status(400).json({ message: "Task not found." });
        }

        if (!task.user._id.equals(userId)) {
            res.status(400).json({ message: "Not authorised." });
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;
        if (completed !== undefined) task.completed = completed;

        await task.save();
        res.status(200).json(task);

    } catch (error) {
        res.status(400).json({ meassage: `Error in updating task. Error: ${error.message}` });
    }

});

export const deleteTask = asyncHandler(async (req, res) => {
    try{

        const userId = req.user_id;

        const { id } = req.params;

        const task = await TaskModel.findById(id);

        if (!task) {
            res.status(400).json({ message: "Task not found." });
        }

        if (!task.user._id.equals(userId)) {
            res.status(400).json({ message: "Not authorised." });
        }

        await TaskModel.findByIdAndDelete(id);
        
    }catch(error){
        res.status(400).json({ meassage: `Error in deleting task. Error: ${error.message}` });
    }
});

