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



    useEffect(() => {

        getTasks();

        getTask();

    }, [userId]);





    return (
        <TasksContext.Provider value={{ tasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TasksContext);
};