import { getAuth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import ErrorHandler from "@/helper/errorHandler.helper";
import { AuthResponse, RESPONSE_STATUS } from "@/interfaces/data";
import app from "../firebase";

const auth = getAuth(app);

const signIn = async (email: string, password: string): Promise<AuthResponse<User>> => {
    try{
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        if(!user.emailVerified){
            await signOut(auth);
            return { status: RESPONSE_STATUS.UNAUTHORIZED, message: "Please verify your email." };
        }
        return { response: user, status: RESPONSE_STATUS.CREATED, message: "Sign in successfully." };
    } catch (error: any){
        const errorMessage = error.message;
        const errorCode = error.code;
        const message = ErrorHandler(errorCode, errorMessage);
        return { message, status: RESPONSE_STATUS.ERROR };
    }
}

export default signIn;