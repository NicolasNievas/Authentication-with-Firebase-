"use client"
import React, { useState, useEffect } from "react";
import { LOGIN_VIEW } from "@/interfaces/data";
import { useDataContext } from "@/context/data.context";
import signIn from "@/services/auth/signIn";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RESPONSE_STATUS } from "@/interfaces/data";
import GoogleImage from "@/components/GoogleImage";
import Button from "@/components/Button";
import GithubImage from "@/components/GitHubImage";
import signInWithGoogle from "@/services/auth/SignInWithGoogle";
import signInWithGitHub from "@/services/auth/signInWithGitHub";

interface ILoginProps {
  setCurrentView: (view: LOGIN_VIEW) => void;
}

const Login = ({ setCurrentView }: ILoginProps) => {
  const { setUser } = useDataContext();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { response, status, message } = await signIn(userEmail, userPassword);

    if (status === RESPONSE_STATUS.UNAUTHORIZED && message) {
      toast.error(message, { toastId: "fail" });
      return;
    }
    if (status === RESPONSE_STATUS.ERROR && message) {
      toast.error(message, { toastId: "fail" });
      return;
    }
    setUser(response!);
    toast.success(message, { toastId: "success" });
    router.push("/");
  };

  useEffect(() => {
    if (userEmail && userPassword) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [userEmail, userPassword]);

  const handleSubmitWithGoogle = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { response, status, message } = await signInWithGoogle();

    if (status === 400 && message) {
      toast.error(message, { toastId: "fail" });
    } else {
      setUser(response!);
      toast.success(message, { toastId: "success" });
      router.push("/");
    }
  };

  const handleSubmitWithGitHub = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { response, status, message } = await signInWithGitHub();

    if (status === 400 && message) {
      toast.error(message, { toastId: "fail" });
    } else {
      setUser(response!);
      toast.success(message, { toastId: "success" });
      router.push("/");
    }
  };

  return (
    <div
      id="login-pages"
      className="w-full min-h-screen flex items-center justify-center"
    >
      <div
        id="onboarding-card"
        className="bg-white p-8 md:p-16 rounded-lg shadow-lg shadow-black max-w-2xl w-full"
      >
        <div
          id="onboarding-form"
          className="flex flex-col justify-center w-full text-center"
        >
          <h2 className="text-lg font-bold mb-4 text-black">WELCOME BACK</h2>
          <p className="text-sm mb-6 text-gray-txt">Log in to access.</p>
          <form className="relative mb-4" onSubmit={handleSubmitWithGoogle}>
            <GoogleImage
              classname="absolute bottom-[40%] left-[5%]"
              width={40}
              height={40}
            />
            <Button
              name="Continue with Google"
              className="hover:font-bold w-full"
            />
          </form>
          <form className="relative mb-4" onSubmit={handleSubmitWithGitHub}>
            <GithubImage
              classname="absolute bottom-[40%] left-[5%]"
              width={40}
              height={40}
            />
            <Button
              name="Continue with GitHub"
              className="hover:font-bold w-full"
            />
          </form>
          <div className="w-full flex items-center before:content-[''] before:border-b-2 before:h-1.5 before:flex-1 after:border-b-2 after:h-1.5 after:flex-1">
            <span className="p-4">Or</span>
          </div>
          <form onSubmit={handleSubmit}>
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
            <div className="mb-4">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                title="Enter your password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <Button
              name="Sign in"
              isDisabled={isSubmitDisabled}
              className="text-sm px-4 py-2 transition-colors duration-200 hover:bg-gray-700 w-full"
            />
          </form>
          <div className="mt-4">
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot your password?
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="text-sm text-blue-500 hover:underline"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
