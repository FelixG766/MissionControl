import moment from "moment";
import { Task } from "./types";

export const formatCreatedTime = (createdAt: string) => {
    const now = moment();
    const created = moment(createdAt);

    if (created === now) return "Today";

    if (created.isSame(now.subtract(1, "day"), "day")) {
        return "Yesterday";
    }

    if (created.isAfter(moment().subtract(6, "days"))) {
        return created.fromNow();
    }

    if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
        return created.fromNow();
    }

    return created.format("DD/MM/YYYY");

};

export const filterByMiniBarOption = (tasks: Task[], miniBarOption: string) => {
    if (miniBarOption === "Completed") {
        return filterCompletedTask(tasks);
    }
    if (miniBarOption === "Overdue") {
        return filterOverdueTask(tasks);
    }
    return tasks;
};

const filterCompletedTask = (tasks: Task[]) => {
    return tasks.filter((task) => task.completed);
}

const filterOverdueTask = (tasks: Task[]) => {
    return tasks.filter((task) => !task.completed && task.dueDate && moment(task.dueDate).isBefore(moment()));
}

export const filterByPriority = (tasks: Task[], priority: string) => {
    if (priority === "All") return tasks;
    return tasks.filter((task) => task.priority.toLowerCase() === priority.toLowerCase());
};

export const getTaskCounts = (tasks: Task[]) => {
    return tasks.reduce((counts, task) => {
        if (task.completed) {
            counts.completedTasksCountVal++;
        } else {
            counts.activeTasksCountVal++;
        }
        return counts;
    },
        { activeTasksCountVal: 0, completedTasksCountVal: 0 }
    );
};



