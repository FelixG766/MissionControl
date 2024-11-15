"use client"
import { useUserContext } from "@/context/user/userContext";
import Image from "next/image";
import React from "react"

const Profile = () => {
    const { user } = useUserContext();
    if (!user) return;
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
        </div>
    );
}

export default Profile;