"use client"
import FileCheckIcon from "@/public/icons/FileCheckIcon";
import GridIcon from "@/public/icons/GridIcon";
import StopWatchIcon from "@/public/icons/StopWatchIcon";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import DeleteAllIcon from "@/public/icons/DeleteAllIcon";
import { useUserContext } from "@/context/user/userContext";

const MiniSideBar = () => {

    const pathName = usePathname();

    const { user } = useUserContext();
    if (!user) return;

    const getStrokeColor = (link: string) => {
        return pathName === link ? "#3aafae" : "#71717a";
    }

    const navItems = [
        {
            icon: <GridIcon strokeColor={getStrokeColor("/")} />,
            title: "All",
            link: "/"
        },
        {
            icon: <FileCheckIcon strokeColor={getStrokeColor("/completed")} />,
            title: "Completed",
            link: "/completed"
        },
        {
            icon: <StopWatchIcon strokeColor={getStrokeColor("/overdue")} />,
            title: "Overdue",
            link: "/overdue"
        }
    ];

    return (
        <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
            <div className="relative h-[5rem] w-full">
                <Image
                    src="/logo.png"
                    alt="logo"
                    fill
                    className="p-5 object-contain"
                />
            </div>
            <div className="mt-8 flex-1 flex flex-col items-center justify-between">
                <ul className="flex flex-col gap-10">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="relative group"
                        >
                            <Link href={item.link}>{item.icon}</Link>
                            <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.title}
                            </span>

                        </li>
                    ))}
                </ul>

                <div className="mb-[1.5rem]">
                    <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] p-2 rounded-full">
                        <DeleteAllIcon strokeColor="#EB4E31" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MiniSideBar;