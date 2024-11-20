"use client"
import { useTasks } from "@/context/task/taskContext";
import React from "react";
import EditTaskDialog from "@/app/component/EditTaskDialog/EditTaskDialog";
import EditProfileDialog from "@/app/component/EditProfileDialog/EditProfileDialog";

interface MainLayoutProviderPros {
    children: React.ReactNode;
}

function MainLayoutProvider({ children }: MainLayoutProviderPros) {
    const { showEditTaskForm, showEditProfileForm } = useTasks();
    return (
        <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-lg overflow-auto">
            {showEditTaskForm && <EditTaskDialog />}
            {showEditProfileForm && <EditProfileDialog />}
            {children}
        </div>
    );
}

export default MainLayoutProvider;