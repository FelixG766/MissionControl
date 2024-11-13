"use client"
import { useUserContext } from "@/context/user/userContext";
import React, { useState } from "react"
import toast from "react-hot-toast";

function ChangePasswordForm() {
    const { changePassword } = useUserContext();

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const handleNewPasswordChange = (e: any) => {
        setNewPassword(e.target.value);
    }

    const handleNewConfirmPasswordChange = (e: any) => {
        setNewConfirmPassword(e.target.value);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const toggleShowNewConfirmPassword = () => {
        setShowNewConfirmPassword(!showNewConfirmPassword);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(newPassword != newConfirmPassword){
            toast.error("New passwords don't match.");
            return;
        }
        changePassword(password, newPassword);
    }

    return (
        <main className="auth-page w-full h-full flex justify-center items-center">
            <form className="lf-0 mt-0 m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full" onSubmit={handleSubmit}>
                <div className="relative z-10">
                    <h1 className="mb-2 text-center text-[1.35rem] font-medium">
                        Change Password
                    </h1>
                    <div className="relative mt-[1rem] flex flex-col">
                        <label htmlFor="password" className="mb-1 text-[#999]">Old Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                            placeholder="Type your old password"
                        />
                        <button type="button" className="absolute p-1 right-4 top-[43%] text-[22px] opacity-45" onClick={toggleShowPassword}>
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                    <div className="relative mt-[1rem] flex flex-col">
                        <label htmlFor="newPassword" className="mb-1 text-[#999]">New Password</label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                            placeholder="Type your new password again"
                        />
                        <button type="button" className="absolute p-1 right-4 top-[43%] text-[22px] opacity-45" onClick={toggleShowNewPassword}>
                            <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                    <div className="relative mt-[1rem] flex flex-col">
                        <label htmlFor="confirmNewPassword" className="mb-1 text-[#999]">Confirm New Password</label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={newPassword}
                            onChange={handleNewConfirmPasswordChange}
                            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                            placeholder="Type your new password again"
                        />
                        <button type="button" className="absolute p-1 right-4 top-[43%] text-[22px] opacity-45" onClick={toggleShowNewConfirmPassword}>
                            <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                    <div className="flex">
                    <button
                        className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:text-[#1abc9c] transition-colors"
                        type="submit"
                    >
                        Confirm Change
                    </button>
                    </div>
                </div>
                <img src="/flurry.png" alt="Background graphic" />
            </form>
        </main>
    );
}

export default ChangePasswordForm;