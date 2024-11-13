"use client";

import { useUserContext } from "@/context/user/userContext";
import React, { useState, use } from "react"; // Import `use` to unwrap promises
import toast from "react-hot-toast";

interface Params {
    resetToken: string;
}

interface Props {
    params: Promise<Params>;
}

function Page({ params }: Props) {
    
    const { resetToken } = use(params);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword } = useUserContext();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmedPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const togglePassword = () => setShowPassword(!showPassword);

    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        resetPassword(resetToken, password);
    };

    return (
        <main className="auth-page w-full h-full flex justify-center items-center">
            <form className="m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full" onSubmit={handleSubmit}>
                <div className="relative z-10">
                    <h1 className="mb-2 text-center text-[1.35rem] font-medium">
                        Reset Password
                    </h1>
                    <div className="relative mt-[1rem] flex flex-col">
                        <label htmlFor="password" className="mb-1 text-[#999]">New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                            placeholder="Type your new password"
                        />
                        <button type="button" className="absolute p-1 right-4 top-[43%] text-[22px] opacity-45" onClick={togglePassword}>
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                    <div className="relative mt-[1rem] flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-1 text-[#999]">Confirm New Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmedPasswordChange}
                            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                            placeholder="Type your new password again"
                        />
                        <button type="button" className="absolute p-1 right-4 top-[43%] text-[22px] opacity-45" onClick={toggleConfirmPassword}>
                            <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                    <div className="flex">
                    <button
                        className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:text-[#1abc9c] transition-colors"
                        type="submit"
                    >
                        Reset
                    </button>
                    </div>
                </div>
                <img src="/flurry.png" alt="Background graphic" />
            </form>
        </main>
    );
}

export default Page;
