"use client"
import React from "react"
import Profile from "../Profile/Profile";
import { useUserContext } from "@/context/user/userContext";
import RadialChart from "../RadialChart/RadialChart";

const Sidebar = () => {
    const { user } = useUserContext();
    if (!user) return;
    return (
        <div className="w-[20rem] h-[calc(100%-5rem)] bg-[#f9f9f9] flex flex-col">
            <Profile />
            <div className="mt-4 mx-6">
                <RadialChart />
            </div>
            <button className="mt-auto mb-6 mx-6 py-4 px-8 bg-red-600 text-white rounded-[50rem]">
                Log Out
            </button>
        </div>
    );
}

export default Sidebar;