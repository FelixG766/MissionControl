"use client"
import { useTasks } from "@/context/task/taskContext";
import { useUserContext } from "@/context/user/userContext";
import Image from "next/image";
import React from "react"

const Profile = () => {
    const { user } = useUserContext();
    if (!user) return null;
    const { tasks, activeTasksCount, completedTasksCount } = useTasks();

    const taskData = [
        { label: "Total Tasks", value: tasks.length, color: "bg-purple-500" },
        { label: "In Progress", value: activeTasksCount, color: "bg-[#3AAFAE]" },
        { label: "Completed", value: completedTasksCount, color: "bg-green-400" },
    ];

    return (
        <div className="m-6">
            <div className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.08rem]
            hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white">
                <div>
                    <Image
                        src={user.photo || "https://user-images.githubusercontent.com/36547915/97088991-45da5d00-1652-11eb-900f-80d106540f4f.png"}
                        alt="avatar"
                        width={70}
                        height={70}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h1 className="flex flex-col text-xl">
                        <span className="font-medium">Hello, </span>
                        <span className="font-bold">{user.name}</span>
                    </h1>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-4">
                    {taskData.map((task, index) => (
                        <div key={index} className="text-gray-400">
                            <p>{task.label}:</p>
                            <p className="pl-4 relative flex gap-2">
                                <span
                                    className={`absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] ${task.color} rounded-[5px]`}
                                ></span>
                                <span className="font-medium text-4xl text-[#333]">
                                    {task.value}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                <h3 className="mt-8 font-medium">Activity</h3>
            </div>
        </div>
    );
}

export default Profile;