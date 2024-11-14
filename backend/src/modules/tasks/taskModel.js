import mongoose from "mongoose";

// Create schema for entity in mongoDB, with timestamp
const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "task title"],
            unique: true,
        },
        description: {
            type: String,
            default: "No description provided.",
        },
        dueDate: {
            type: Date,
            default: Date.now(),
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        status: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamp: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;