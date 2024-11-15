"use client"
import React from "react"
import Profile from "../Profile/Profile";
import { useUserContext } from "@/context/user/userContext";

const Sidebar = () => {
    const {user} = useUserContext();
    if(!user) return;
    return (
        <div className="w-[20rem] h-[calc(100%-5rem)] bg-[#f9f9f9] flex flex-col">
            <Profile />
        </div>
    );
}

export default Sidebar;