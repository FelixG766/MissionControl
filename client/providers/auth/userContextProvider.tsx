import React from "react";
import { AppUserProvider } from "../../context/user/userContext.js";

interface Props {
    children: React.ReactNode;
}

function UserContextProvider({ children }: Props) {
    return <AppUserProvider>{children}</AppUserProvider>
}

export default UserContextProvider;

