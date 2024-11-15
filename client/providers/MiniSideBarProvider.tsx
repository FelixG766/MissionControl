"use client"
import Sidebar from "@/app/component/Sidebar/Sidebar";
import { useUserContext } from "@/context/user/userContext";
import React from "react";

function SidebarProvider() {

    const { user } = useUserContext();

    if (!user) return;

    return (
        <>
            {user._id && <Sidebar />}
        </>
    );
}

export default SidebarProvider;