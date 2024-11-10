"use client";
import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const AppUserProvider = ({ children }) => {
    return (
        <UserContext.Provider value={"Hello"}>
            {children}
        </UserContext.Provider>
    );
};

export default AppUserProvider;

export const useUserContext = () => {
    return useContext(UserContext);
}