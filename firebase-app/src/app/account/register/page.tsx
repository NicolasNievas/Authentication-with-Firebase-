import { useEffect, useState } from "react";
import { LOGIN_VIEW } from "@/interfaces/data";
import Button from "@/components/Button";
import signUp from "@/services/auth/signUp";
import { toast } from "react-toastify";

interface IRegisterProps {
  setCurrentView: (view: LOGIN_VIEW) => void;
}

const Register = ({ setCurrentView }: IRegisterProps) => {
  const [userFirstName, setUserFirstName] = useState<string>("")
  const [userLastName, setUserLastName] = useState<string>("")
  const [userEmail, setUserEmail] = useState<string>("")
  const [userPassword, setUserPassword] = useState<string>("")
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { status, message } = await signUp(userEmail, userPassword);
    
    if (status === 400 && message) {
      toast.error(message, { toastId: "fail" })
    }
    else {
      toast.success(message, { toastId: "register" })
      setCurrentView(LOGIN_VIEW.SIGN_IN)
    }
  };

  useEffect(() => {
    if (userFirstName && userLastName && userEmail && userPassword) {
      setIsSubmitDisabled(false)
    }
    else {
      setIsSubmitDisabled(true)
    }
  }, [userEmail, userPassword, userFirstName, userLastName])

  return (
    <div 
    id="register-pages" 
    className="w-full min-h-screen flex items-center justify-center "
  >
    <div 
      id="onboarding-card" 
      className="bg-white p-8 md:p-16 rounded-lg shadow-lg shadow-black max-w-2xl w-full"
    >
      <div 
        id="onboarding-form" 
        className="flex flex-col justify-center w-full text-center"
      >
        <h2 className="text-lg font-bold mb-4 text-black">BECOME A MEMBER</h2>
        <p className="text-sm mb-6 text-gray-txt">Create your Member profile</p>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <input
                id="first-name"
                type="text"
                name="first-name"
                placeholder="First Name"
                title="Enter your first name"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                id="last-name"
                type="text"
                name="last-name"
                placeholder="Last Name"
                title="Enter your last name"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
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
              name="Sign up" 
              isDisabled={isSubmitDisabled} 
              className="text-sm px-4 py-2 transition-colors duration-200 hover:bg-gray-700 w-full" 
            />
            <div className="mt-4">
              <button 
                onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)} 
                className="text-sm text-blue-500 hover:underline"
              >
                I have an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default Register;
