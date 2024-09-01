"use client"
import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import { LOGIN_VIEW } from "@/interfaces/data";
import PasswordReset from "./password/Password";

export default function Account() {
    const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {currentView === LOGIN_VIEW.SIGN_IN && (
                <Login setCurrentView={setCurrentView} />
            )}
            {currentView === LOGIN_VIEW.REGISTER && (
                <Register setCurrentView={setCurrentView} />
            )}
            {currentView === LOGIN_VIEW.FORGOT_PASSWORD && (
                <PasswordReset setCurrentView={setCurrentView} />
            )}
        </div>
    );
}
