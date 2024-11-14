"use client"
import { useUserContext } from "@/context/user/userContext";
import React from "react";

interface MainContentLayoutProps {
    children: React.ReactNode;
}

function MainContentLayoutProvider({ children }: MainContentLayoutProps) {

    const { user } = useUserContext();

    if (!user) return;

    const userId = user._id;

    return (
        <main className={`${userId ? "pr-[20rem]" : ""} pb-[1.5rem] flex h-full`}>
            {children}
        </main>
    );
}

export default MainContentLayoutProvider;