import { Task } from "@/utils/types";
import React from "react";
import { formatCreatedTime } from "@/utils/utilities";
import { editIcon, starIcon, trashIcon } from "@/utils/icons";
import { useTasks } from "@/context/task/taskContext";

interface TaskItemProps {
    task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {

    const { getTask, deleteTask, showUpdateTaskDialog } = useTasks();

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "low":
                return "text-green-500";
            case "medium":
                return "text-yellow-500";
            default:
                return "text-red-500";
        }
    }

    return (
        <div className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white">
            <div>
                <h4 className="font-bold text-2xl">{task.title}</h4>
                <p>{task.description}</p>
            </div>
            <div className="mt-auto flex justify-between items-center">
                <p className="text-sm text-gray-400">{formatCreatedTime(task.createdAt)}</p>
                <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>{task.priority}</p>
                <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
                    <button className={`${task.completed ? "text-yellow-400" : "text-gray-400"}`}>{starIcon}</button>
                    <button
                        className="text-[#00A1F1]"
                        onClick={async () => {
                            await getTask(task._id);
                            showUpdateTaskDialog();
                        }}
                    >
                        {editIcon}
                    </button>
                    <button
                        className="text-[#F65314]"
                        onClick={() => deleteTask(task._id)}
                    >
                        {trashIcon}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;