"use client"
import { useTasks } from "@/context/task/taskContext";
import { useUserContext } from "@/context/user/userContext";
import { githubIcon, moonIcon, profileIcon } from "@/utils/icons";
import Link from "next/link";
import React from "react";

const Header = () => {

    const { user } = useUserContext();
    const { activeTasksCount } = useTasks();

    if (!user) return;

    return (
        <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
            <div>
                <h1 className="text-lg font-medium">
                    {user._id ? `Welcome, ${user.name}.` : "Welcome to Mission Control."}
                    <span role="img" aria-label="wave">
                        👋
                    </span>
                </h1>
                <p className="text-sm">
                    {user._id ? (
                        <>
                            You have <span className="font-bold text-[#3aafea]">{activeTasksCount}</span>&nbsp;active tasks
                        </>
                    ) : "Please login or register to view you tasks."}
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <Link
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
                    href="https://github.com/FelixG766"
                    passHref
                    target="_blank"
                    rel="noopener noreferrer">
                    {githubIcon}
                </Link>
                <Link
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
                    href="https://github.com/FelixG766"
                    passHref
                    target="_blank"
                    rel="noopener noreferrer">
                    {moonIcon}
                </Link>
                <Link
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
                    href="https://github.com/FelixG766"
                    passHref
                    target="_blank"
                    rel="noopener noreferrer">
                    {profileIcon}
                </Link>
            </div>
        </header>
    );
}

export default Header;