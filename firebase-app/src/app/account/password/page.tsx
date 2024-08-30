"use client"
import { useState, useEffect } from "react";
import { LOGIN_VIEW } from "@/interfaces/data";
import restartPassword from "@/services/auth/restartPassword";
import { RESPONSE_STATUS } from "@/interfaces/data";
import Button from "@/components/Button";
import { toast } from "react-toastify";

interface IPasswordResetProps {
    setCurrentView: (view: LOGIN_VIEW) => void;
}

const PasswordReset = ({ setCurrentView }: IPasswordResetProps) => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    const handleRestartPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { status, message } = await restartPassword(userEmail);

        if (status === RESPONSE_STATUS.ERROR && message) {
            toast.error(message, { toastId: "fail" });
        } else {
            toast.success("Password reset email sent successfully.", { toastId: "success" });
            setCurrentView(LOGIN_VIEW.SIGN_IN);
        }
    };

    useEffect(() => {
        setIsSubmitDisabled(!userEmail);
    }, [userEmail]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 md:p-16 rounded-lg shadow-lg shadow-black max-w-2xl w-full">
                <h2 className="text-lg font-bold mb-4 text-black">Reset Password</h2>
                <p className="text-sm mb-6 text-gray-txt">Enter your email to receive password reset instructions.</p>
                <form onSubmit={handleRestartPassword}>
                    <div className="mb-4">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            title="Enter your email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <Button 
                      name="Send Reset Email" 
                      isDisabled={isSubmitDisabled} 
                      className="text-sm px-4 py-2 transition-colors duration-200 hover:bg-gray-700 w-full" 
                    />
                </form>
                <div className="mt-4">
                    <button 
                      onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)} 
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;