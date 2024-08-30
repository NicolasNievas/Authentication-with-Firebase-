import app from "../firebase";
import { getAuth, sendPasswordResetEmail, User } from "firebase/auth";
import ErrorHandler from "@/helper/errorHandler.helper";
import { AuthResponse, RESPONSE_STATUS } from "@/interfaces/data";

const auth = getAuth(app);

const restartPassword = async (email: string): Promise<AuthResponse<User>> => {
    try{
        await sendPasswordResetEmail(auth, email);
        return { status: RESPONSE_STATUS.CREATED, message: "Email sent successfully." };
    } catch (error: any){
        const errorMessage = error.message;
        const errorCode = error.code;
        const message = ErrorHandler(errorCode, errorMessage);
        return { message, status: RESPONSE_STATUS.ERROR };
    }
}

export default restartPassword;