"use client"
import { useUserContext } from "@/context/user/userContext";
import React from "react";

function RegisterForm() {
    const { registerUser, userState, handleUserInput } = useUserContext();
    const { name, email, password } = userState;
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePassword = () => setShowPassword(!showPassword);
    
    return (
        <form className="m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]">
            <div className="relative z-10">
                <h1 className="mb-2 text-center text-[1.35rem] font-medium">
                    Register for an Account
                </h1>
            </div>
            <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
                Create an account. Already have an account?{" "}
                <a href="/login" className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300">
                    Login here
                </a>
            </p>
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-[#999]">
                    Full Name
                </label>
                <input type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => handleUserInput("name")(e)}
                    className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-800"
                    placeholder="John Doe" />
            </div>
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
            <div className="flex">
                <button type="submit"
                    onClick={registerUser}
                    disabled={!name || !email || !password}
                    className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:text-[#1abc9c] transition-colors">
                    Register Now
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;