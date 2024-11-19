"use client"
import { useTasks } from "@/context/task/taskContext";
import React, { useRef } from "react";
import useDetectOutside from "@/hooks/useDetectOutside";

const EditTaskDialog = () => {

    const { task, handleInput, createTask, editTaskDialogType, updateTask, closeEditTaskForm, showEditTaskForm } = useTasks();

    const taskDialogRef = useRef(null);

    useDetectOutside({
        ref: taskDialogRef,
        callback: () => {
            if (showEditTaskForm) {
                closeEditTaskForm();
            }
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editTaskDialogType === "update") {
            updateTask(task);
        } else {
            createTask(task);
        }
        closeEditTaskForm();
    }

    return (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
            <form
                className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
                onSubmit={handleSubmit}
                ref={taskDialogRef}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                        className="bg-[#F9F9F9] p-2 rounded-md border"
                        type="text"
                        placeholder="Task Title"
                        name="title"
                        value={task.title}
                        onChange={(e) => handleInput("title")(e)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="bg-[#F9F9F9] p-2 rounded-md border resize-none"
                        name="description"
                        placeholder="Task Description"
                        rows={4}
                        value={task.description}
                        onChange={(e) => handleInput("description")(e)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="priority">Priority</label>
                    <select
                        className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                        name="priority"
                        value={task.priority}
                        onChange={(e) => handleInput("priority")(e)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        className="bg-[#F9F9F9] p-2 rounded-md border"
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={(e) => handleInput("dueDate")(e)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="completed">Completed</label>
                    <select
                        className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                        name="completed"
                        value={task.completed}
                        onChange={(e) => handleInput("completed")(e)}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${editTaskDialogType === "update" ? "bg-blue-400" : "bg-green-400"
                            }`}
                    >
                        {editTaskDialogType === "update" ? "Update Task" : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTaskDialog;