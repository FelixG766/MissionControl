"use client"
import React from "react";
import { AppUserProvider } from "../../context/user/userContext.js";
import { TasksProvider } from "../../context/task/taskContext.js"

interface Props {
    children: React.ReactNode;
}

function UserContextProvider({ children }: Props) {
    return (
        <AppUserProvider>
            <TasksProvider>
                {children}
            </TasksProvider>
        </AppUserProvider>
    )
}

export default UserContextProvider;

