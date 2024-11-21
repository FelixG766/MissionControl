"use client"
import { useTasks } from "@/context/task/taskContext";
import { useUserContext } from "@/context/user/userContext";
import React from "react"

const TaskStatDashboard = () => {
    const { user } = useUserContext();
    if (!user) return null;
    const { tasks, activeTasksCount, completedTasksCount } = useTasks();

    const taskData = [
        { label: "Total Tasks", value: tasks.length, color: "bg-purple-500" },
        { label: "In Progress", value: activeTasksCount, color: "bg-[#3AAFAE]" },
        { label: "Completed", value: completedTasksCount, color: "bg-green-400" },
    ];

    return (
        <div className="m-6 grid grid-cols-2 gap-4">
            {taskData.map((task, index) => (
                <div key={index} className="text-gray-400">
                    <p>{task.label}:</p>
                    <p className="pl-4 relative flex gap-2">
                        <span
                            className={`absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] ${task.color} rounded-[5px]`}
                        ></span>
                        <span className="font-medium text-4xl text-[#333]">
                            {task.value}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default TaskStatDashboard;