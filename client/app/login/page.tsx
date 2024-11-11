import React from "react";
import LoginForm from "../component/auth/LoginForm/LoginForm";

function page() {
    return (
    <div className="auth-page w-full h-full flex justify-center items-center">
        <LoginForm />
    </div>);
}

export default page;