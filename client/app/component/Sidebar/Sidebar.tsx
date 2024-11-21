"use client"
import React from "react"
import Profile from "../Profile/Profile";
import { useUserContext } from "@/context/user/userContext";
import RadialChart from "../RadialChart/RadialChart";
import TaskStatDashboard from "../TaskStatDashboard/TaskStatDashboard";

const Sidebar = () => {
    const { user, logoutUser } = useUserContext();
    if (!user) return;
    return (
        <div className="w-[20rem] h-[calc(100%-5rem)] bg-[#f9f9f9] flex flex-col overflow-auto">
            <Profile />
            <TaskStatDashboard />
            <RadialChart />
            <button
                onClick={logoutUser}
                className="m-6 mt-auto py-4 px-8 bg-red-600 text-white rounded-[50rem]"
            >
                Log Out
            </button>
        </div>
    );
}

export default Sidebar;