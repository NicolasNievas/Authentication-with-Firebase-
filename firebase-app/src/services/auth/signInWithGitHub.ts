import app from "../firebase";
import { getAuth, signInWithPopup, User, GithubAuthProvider } from "firebase/auth";
import ErrorHandler from "@/helper/errorHandler.helper";
import { AuthResponse, RESPONSE_STATUS } from "@/interfaces/data";

const auth = getAuth(app);
const provider = new GithubAuthProvider();

const signInWithGitHub = async (): Promise<AuthResponse<User>> => {
    try{
        const { user } = await signInWithPopup(auth, provider);
        return { response: user, status: RESPONSE_STATUS.CREATED, message: "Sign in successfully." };
    }
    catch (error: any){
        const errorMessage = error.message;
        const errorCode = error.code;
        const message = ErrorHandler(errorCode, errorMessage);
        return { message, status: RESPONSE_STATUS.ERROR };
    }
}

export default signInWithGitHub;