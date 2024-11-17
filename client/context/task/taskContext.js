"use client"
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useUserContext } from "../user/userContext";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState(null);
    const userId = useUserContext().user._id;

    const serverUrl = "http://localhost:8000/api/v1";

    const getTasks = async () => {

        setLoading(true);

        try {

            const res = await axios.get(`${serverUrl}/tasks`);

            setTasks(res.data);

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
            const res = await axios.post(`${serverUrl}/task/save`, { task });
            setTasks([...tasks, res.data]);
        } catch (error) {
            console.log("Failed to create task.", error);
        }
        setLoading(false);
    }

    const updateTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.patch(`${serverUrl}/task/${task._id}`, { task });
            const newTasks = tasks.map((t) => (t._id === res.data._id ? res.data : t));
            setTasks(newTasks);
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

    useEffect(() => {

        getTasks();

    }, [userId]);

    return (
        <TasksContext.Provider value={{
            tasks,
            getTask,
            getTasks,
            createTask,
            updateTask,
            deleteTask
        }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TasksContext);
};