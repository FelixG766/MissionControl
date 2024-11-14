"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const UserContext = createContext();

axios.defaults.withCredentials = true;

export const AppUserProvider = ({ children }) => {

    const serverUrl = "http://localhost:8000"
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

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
    };

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
            await getUser();
            setUserState({
                email: "",
                password: "",
            });
            router.push("/");

        } catch (error) {
            console.log("Error loging in user.", error);
            toast.error(error.response.data.message);
        }
    };

    const logoutUser = async () => {
        try {
            await axios.get(`${serverUrl}/api/v1/logout`, {
                withCredentials: true,
            })
            toast.success("User logged out successfully.");
            router.push("/login");
        } catch (error) {
            console.log("Failed to log out user.", error);
            toast.error(error.response.data.message);
        }
    };

    const getUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/api/v1/user`, {
                withCredentials: true
            });
            setUser((prevState) => {
                return {
                    ...prevState,
                    ...res.data,
                }
            });
        } catch (error) {
            console.log("Error getting user details", error);
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };

    const getAllUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/api/v1/admin/user/list`, {},
                {
                    withCredentials: true
                }
            );
            setAllUsers(res.data);
        } catch (error) {
            console.log("Failed to get all users.", error);
            toast.error(error.response.data.message);
        }
        setLoading(false);
    }

    const updateUser = async (e, data) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
                withCredentials: true
            });

            setUser((prev) => {
                return {
                    ...prev,
                    ...res.data,
                };
            });

            toast.success("User update successfully.");

        } catch (error) {
            console.log("Failed to update user.", error);
            toast.error(error.response.data.message);
        }

        setLoading(false);
    }

    const deleteUser = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/api/v1/admin/user/${id}`,
                {},
                {
                    withCredentials: true
                });
            toast.success("User deleted successfully.");
            await getAllUser();
        } catch (error) {
            console.log("Failed to delete user.", error);
            toast.error(error.response.data.message);
        }
        setLoading(false);
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
        } catch (error) {
            if (!error.response || error.response.status !== 200) {
                loggedIn = false;
            }
            console.log("Falied to obtain user status.", error.message);
        } finally {
            setLoading(false);
        }
        return loggedIn;
    };

    const verifyEmail = async () => {
        setLoading(true);
        try {
            await axios.post(`${serverUrl}/api/v1/verify-email`,
                {},
                {
                    withCredentials: true
                });
            toast.success("Email verification successfully.");
        } catch (error) {
            console.log("Failed to verify email.", error);
            toast.error(error.response.data.message);
        }
        setLoading(false);
    }

    const verifyUser = async (token) => {
        setLoading(true);
        try {
            await axios.post(`${serverUrl}/api/v1/verify-user/${token}`,
                {},
                {
                    withCredentials: true

                }
            );

            toast.success("User verification successfully.");
            await getUser();
            setLoading(false);
            router.push("/");
        } catch (error) {
            console.log("Failed to verify user.", error);
            toast.error(error.response.data.message);
            setLoading(false);
        }

    }

    const forgotPassword = async (email) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/api/v1/forgot-password`,
                {
                    email
                },
                {
                    withCredentials: true
                });
            toast.success("Forgot email has been sent.");
        } catch (error) {
            console.log("Failed to sent forgot email.", error);
            toast.error(error.response.data.message);
        }
        setLoading(false);
    }

    const resetPassword = async (token, password) => {

        setLoading(true);

        try {
            await axios.post(`${serverUrl}/api/v1/reset-password/${token}`,
                {
                    password
                },
                {
                    withCredentials: true
                }
            )
            toast.success("Password reset successfully.");
            setLoading(false);
            router.push("/login");
        } catch (error) {
            console.log("Failed to reset password.", error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    const changePassword = async (password, newPassword) => {
        setLoading(true);
        try {
            await axios.patch(`${serverUrl}/api/v1/change-password`,
                {
                    password,
                    newPassword
                },
                {
                    withCredentials: true
                });
            toast.success("Change password successfully.");
        } catch (error) {
            console.log("Failed to change password.", error);
            toast.error(error.response.data.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        const initialiseUserAfterLogin = async () => {
            const isLoggedIn = await getUserLoginStatus();
            if (isLoggedIn) {
                await getUser();
            }
        }
        initialiseUserAfterLogin();
    }, [])

    useEffect(() => {
        if (user && user.role === "admin") {
            getAllUser();
        }
    }, [user])

    return (
        <UserContext.Provider value={{
            user,
            userState,
            allUsers,
            registerUser,
            loginUser,
            logoutUser,
            getUser,
            updateUser,
            deleteUser,
            getUserLoginStatus,
            forgotPassword,
            resetPassword,
            changePassword,
            verifyEmail,
            verifyUser,
            handleUserInput,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}