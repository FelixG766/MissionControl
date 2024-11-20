"use client"
import { useTasks } from "@/context/task/taskContext";
import { useUserContext } from "@/context/user/userContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import { badgeIcon, checkIcon, githubIcon, mailIcon } from "@/utils/icons";
import Image from "next/image";
import React, { useRef, useState } from "react";

const EditProfileDialog = () => {
    const ref = useRef(null);

    const { closeEditProfileForm } = useTasks();
    const { user, updateUser, handlerUserInput, userState, changePassword } = useUserContext();

    useDetectOutside({
        ref,
        callback: () => {
            closeEditProfileForm();
        },
    });

    const { name, email, photo } = user;

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePassword = (type: string) => (e: any) => {
        if (type === "old") {
            setOldPassword(e.target.value);
        } else {
            setNewPassword(e.target.value);
        }
    };

    return (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
            <div
                ref={ref}
                className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md border-2 border-white"
            >
                <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md"></div>

                <div className="mt-4 relative flex justify-between">
                    <div className="relative inline-block">
                        <Image
                            src={photo || "https://user-images.githubusercontent.com/36547915/97088991-45da5d00-1652-11eb-900f-80d106540f4f.png"}
                            alt="profile"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                        <div className="absolute bottom-0 right-1 shadow-sm">
                            <span className="text-lg text-blue-400">{badgeIcon}</span>
                            <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                                {checkIcon}
                            </span>
                        </div>
                    </div>
                    <div className="self-end flex items-center gap-2">
                        <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
                            {githubIcon} Github
                        </button>
                        <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
                            {checkIcon} Verified
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold">{name}</h1>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>

                <form
                    action=""
                    className="mt-4 pt-2 flex flex-col gap-4 border-t-2 border-t-[#323232]/10 rounded-md"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateUser(e, {
                            name: userState.name,
                            email: userState.email,
                        });
                    }}
                >
                    <div className="pt-2 px-2 grid grid-cols-[150px_1fr]">
                        <div className="flex items-center">
                            <label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </label>
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={name}
                            onChange={(e) => handlerUserInput("name")(e)}
                            className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                        />
                    </div>

                    <div className="pt-4 px-2 grid grid-cols-[150px_1fr] border-t-2 border-t-[#323232]/10">
                        <div className="flex items-center">
                            <label htmlFor="email" className="text-sm font-medium align-text-middle">
                                Email Address
                            </label>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => handlerUserInput("email")(e)}
                                className="w-full py-[0.4rem] pl-9 pr-2 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                            <span className="absolute left-0 top-0 bottom-0 flex items-center px-3 text-[#323232]/50">
                                {mailIcon}
                            </span>
                        </div>
                    </div>

                    <div className="pt-4 px-2 flex flex-col gap-4 border-t-2 border-t-[#323232]/10">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <label htmlFor="oldPassWord" className="text-sm font-medium align-text-middle">
                                    Old Password
                                </label>
                            </div>
                            <input
                                type="password"
                                id="oldPassword"
                                value={oldPassword}
                                onChange={handlePassword("old")}
                                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                                <label htmlFor="newPassword" className="text-sm font-medium align-text-middle">
                                    New Password
                                </label>
                            </div>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={handlePassword("new")}
                                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                        </div>
                    </div>
                    <div className="flex px-2 justify-end">
                        <button
                            type="button"
                            className="py-3 px-2 bg-blue-500 text-white text-sm font-medium rounded-md
                  hover:bg-blue-400 transition-all duration-300"
                            onClick={() => changePassword(oldPassword, newPassword)}
                        >
                            Change Password
                        </button>
                    </div>

                    <div className="flex px-2 pt-2 pb-4 justify-end gap-4 border-t-2 border-t-[#323232]/10">
                        <button
                            onClick={closeEditProfileForm}
                            className="mt-3 py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                  hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="mt-3 py-2 px-4 bg-[#3aafae] text-white text-sm font-medium rounded-md
                  hover:bg-[#2e8d8c]/90 transition-all duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileDialog;