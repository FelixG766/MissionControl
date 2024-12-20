"use client"
import { useUserContext } from "@/context/user/userContext";
import React from "react";

interface MainContentLayoutProps {
    children: React.ReactNode;
}

function MainContentLayoutProvider({ children }: MainContentLayoutProps) {

    return (
        <main className={"pb-[1.5rem] flex h-full"}>
            {children}
        </main>
    );
}

export default MainContentLayoutProvider;