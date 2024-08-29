"use client"
import { useState, useEffect, use } from "react";
import { LOGIN_VIEW } from "@/interfaces/data";
import { useDataContext } from "@/context/data.context";
import signIn from "@/services/auth/signIn";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthResponse } from "@/interfaces/data";

interface ILoginProps {
    setCurrentView: (view: LOGIN_VIEW) => void;
}

const Login = ({ setCurrentView }: ILoginProps) => {
    const { setUser } = useDataContext();
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { response, status, message } = await signIn(userEmail, userPassword);

        if(status === 400 && message){
            toast.error(message, { toastId: "fail"});
        }
        else{
            setUser(response!);
            toast.success(message, { toastId: "success" });
            router.push("/");
        }
    };


useEffect(() => {
    if (userEmail && userPassword) {
      setIsSubmitDisabled(false)
    }
    else {
      setIsSubmitDisabled(true)
    }
  }, [userEmail, userPassword])

return(
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign in</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </form>
                        <hr />
                        <button className="btn btn-link" onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}>Create an account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default Login;