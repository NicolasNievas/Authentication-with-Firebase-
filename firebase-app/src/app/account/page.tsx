"use client"
import { useState } from "react";
import Login from "./login/page";
import Register from "./register/page";
import { LOGIN_VIEW } from "@/interfaces/data";

export default function Account() {
    const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN);

    return (
        <div className="min-h-screen flex items-center justify-center">
            {currentView === LOGIN_VIEW.SIGN_IN ? (
                <Login setCurrentView={setCurrentView} />
            ) : (
                <Register setCurrentView={setCurrentView} />
            )}
        </div>
    )
}
