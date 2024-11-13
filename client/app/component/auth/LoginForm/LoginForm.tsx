"use client"
import { useUserContext } from "@/context/user/userContext";
import React from "react";

function LoginForm() {
    const { loginUser, userState, handleUserInput } = useUserContext();
    const { email, password } = userState;
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <form className="m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]">
            <div className="relative z-10">
                <h1 className="mb-2 text-center text-[1.35rem] font-medium">
                    Login to Your Account
                </h1>
            </div>
            <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
                Login now. Don't have an account?{" "}
                <a href="/register" className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300">
                    Register here
                </a>
            </p>
            <div className="mt-[1rem] flex flex-col">
                <label htmlFor="email" className="mb-1 text-[#999]">
                    Email
                </label>
                <input type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleUserInput("email")(e)}
                    className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                    placeholder="JohnDoe@gmail.com" />
            </div>
            <div className="relative mt-[1rem] flex flex-col">
                <label htmlFor="password" className="mb-1 text-[#999]">
                    Passowrd
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleUserInput("password")(e)}
                    className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                    placeholder="examplepassowrd" />
                <button type="button"
                    className="absolute p-1 right-4 top-[43%] text-[22px] opacity-45">
                    {showPassword ?
                        <i className="fas fa-eye-slash" onClick={togglePassword}></i> :
                        <i className="fas fa-eye" onClick={togglePassword}></i>
                    }

                </button>
            </div>
            <div className="mt-4 flex justify-end">
                <a
                    href="/forgot-password"
                    className="font-bold text-[#2ECC71] text-[14px] hover:text-[#7263F3] transition-all duration-300"
                >
                    Forgot password?
                </a>
            </div>
            <div className="flex">
                <button type="submit"
                    onClick={loginUser}
                    disabled={!email || !password}
                    className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:text-[#1abc9c] transition-colors">
                    Login Now
                </button>
            </div>
        </form>
    );
}

export default LoginForm;