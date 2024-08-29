import app from "../firebase";
import { getAuth, signOut, User } from "firebase/auth";
import { AuthResponse, RESPONSE_STATUS } from "@/interfaces/data";
import ErrorHandler from "@/helper/errorHandler.helper";

const auth = getAuth(app);

const logOut = async (): Promise<AuthResponse<User>> => {
    try{
        await signOut(auth);
        return { status: RESPONSE_STATUS.SUCCESS, message: "Sign out successfully." };
    }
    catch(error: any){
        const errorMessage = error.message;
        const errorCode = error.code;
        const message = ErrorHandler(errorCode, errorMessage);
        return { message, status: RESPONSE_STATUS.ERROR };
    }
}

export default logOut;