"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const UserContext = createContext();

export const AppUserProvider = ({ children }) => {
    const serverUrl = "http://localhost:8000"

    const router = useRouter();

    const [user, setUser] = useState(null);
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(true);

    const registerUser = async (e) => {
        e.preventDefault();

        if (!userState.email || !userState.email.includes("@") || !userState.password || userState.password.length < 6) {
            toast.error("Please enter a valid email and password (at least 6 characters).");
            return;
        }

        try {
            const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
            toast.success("User registered successfully.");
            setUserState({
                name: "",
                email: "",
                password: "",
            });
            router.push("/login");
        } catch (error) {
            console.log("Failed to register user.", error);
            toast.error(error.message);
        }
    }

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${serverUrl}/api/v1/login`, {
                email: userState.email,
                password: userState.password
            }, {
                withCredentials: true
            });

            toast.success("User logged in successfully.");
            setUserState({
                email: "",
                password: "",
            });
            router.push("/");

        } catch (error) {
            console.log("Error loging in user.", error);
            toast.error(error.response.data.message);
        }
    }

    const handleUserInput = (name) => (e) => {
        const value = e.target.value;
        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const getUserLoginStatus = async () => {
        let loggedIn = false;
        try {
            const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
                withCredentials: true
            });
            loggedIn = !!res.data;
            setLoading(false);
            if(!loggedIn){
                router.push("/login");
            }
        } catch (error) {
            console.log("Falied to obtain user status.", error);
        }
        return loggedIn;
    }

    const logoutUser = async () => {
        try{
            await axios.get(`${serverUrl}/api/v1/logout`, {
                withCredentials: true,
            })
            toast.success("User logged out successfully.");
            router.push("/login");
        }catch(error){
            console.log("Failed to log out user.", error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <UserContext.Provider value={{
            registerUser,
            loginUser,
            logoutUser,
            getUserLoginStatus,
            userState,
            handleUserInput,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}