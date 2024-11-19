"use client"
import { useTasks } from "@/context/task/taskContext";
import React from "react";
import EditTaskDialog from "@/app/component/EditTaskDialog/EditTaskDialog";

interface MainLayoutProviderPros {
    children: React.ReactNode;
}

function MainLayoutProvider({ children }: MainLayoutProviderPros) {
    const { showEditTaskForm } = useTasks();
    return (
        <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-lg overflow-auto">
            {showEditTaskForm && <EditTaskDialog />}
            {children}
        </div>
    );
}

export default MainLayoutProvider;