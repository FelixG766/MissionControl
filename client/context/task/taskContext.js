"use client"
import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useUserContext } from "../user/userContext";
import toast from "react-hot-toast";
import { filterByPriority, filterByMiniBarOption, getTaskCounts } from "@/utils/utilities";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {

    const defaulTask = {
        priority: "low",
        completed: "false",
        dueDate: new Date().toISOString().split('T')[0],
    }

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState(defaulTask);
    const { user } = useUserContext();
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [miniBarOptionFilter, setMiniBarOptionFilter] = useState("All");

    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [editTaskDialogType, setEditTaskDialogType] = useState();
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);

    const userId = user ? user._id : null;

    const serverUrl = "http://localhost:8000/api/v1";

    const getTasks = async () => {

        setLoading(true);

        try {

            const res = await axios.get(`${serverUrl}/tasks`);
            setTasks(res.data.tasks);

        } catch (error) {

            console.log("Failed to get tasks.", error);

        }

        setLoading(false);
    }

    const getTask = async (taskId) => {

        setLoading(true);

        try {

            const res = await axios.get(`${serverUrl}/task/${taskId}`);

            setTask(res.data);

        } catch (error) {

            console.log("Failed to get task.", error);

        }

        setLoading(false);
    }

    const createTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/task/save`, task);
            setTasks([...tasks, res.data]);
            toast.success("Task created successfully.");
        } catch (error) {
            console.log("Failed to create task.", error);
        }
        setLoading(false);
    }

    const updateTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
            const newTasks = tasks.map((t) => (t._id === res.data._id ? res.data : t));
            setTasks(newTasks);
            toast.success("Task updated successfully.");
        } catch (error) {
            console.log("Failed to update task", error);
        }
        setLoading(false);
    }

    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/task/${taskId}`);
            const newTasks = tasks.map((task) => task._id !== taskId);
            setTasks(newTasks);
        } catch (error) {
            console.log("Failed to delete task.", error);
        }
        setLoading(false);
    }

    const handleInput = (name) => (e) => {
        if (name === "setTask") {
            setTask(e);
        } else {
            setTask({ ...task, [name]: e.target.value });
        }
    }

    const showCreateTaskDialog = () => {
        setTask(defaulTask);
        setShowEditTaskForm(true);
    }

    const showUpdateTaskDialog = () => {
        setEditTaskDialogType("update");
        setShowEditTaskForm(true);
    }

    const closeEditTaskForm = () => {
        setEditTaskDialogType("create");
        setShowEditTaskForm(false);
    }

    useEffect(() => {
        if (userId) {
            getTasks();
        }
    }, [userId]);

    useEffect(() => {
        const { activeTasksCountVal, completedTasksCountVal } = getTaskCounts(tasks);
        setActiveTasksCount(activeTasksCountVal);
        setCompletedTasksCount(completedTasksCountVal);
    }, [tasks]);

    const filteredTasksByStatusCache = useMemo(() => {
        return filterByMiniBarOption(tasks, miniBarOptionFilter);
    }, [tasks, miniBarOptionFilter])

    const filteredTasksByPriorityCache = useMemo(() => {
        return filterByPriority(filteredTasksByStatusCache, priorityFilter);
    }, [filteredTasksByStatusCache, priorityFilter])

    useEffect(() => {
        setFilteredTasks(filteredTasksByPriorityCache);
    }, [filteredTasksByPriorityCache]);

    return (
        <TasksContext.Provider value={{
            task,
            tasks,
            filteredTasks,
            getTask,
            getTasks,
            createTask,
            updateTask,
            deleteTask,
            priorityFilter,
            setPriorityFilter,
            setMiniBarOptionFilter,
            handleInput,
            showEditTaskForm,
            showCreateTaskDialog,
            showUpdateTaskDialog,
            closeEditTaskForm,
            editTaskDialogType,
            completedTasksCount,
            activeTasksCount
        }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TasksContext);
};