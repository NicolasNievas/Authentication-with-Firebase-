import app from "../firebase";
import { getAuth, createUserWithEmailAndPassword, User, sendEmailVerification, signOut } from "firebase/auth";
import { AuthResponse } from "@/interfaces/data";
import { RESPONSE_STATUS } from "@/interfaces/data";
import ErrorHandler from "@/helper/errorHandler.helper";

const auth = getAuth(app);

const signUp = async (email: string, password: string): Promise<AuthResponse<User>> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(user)
    await signOut(auth)
    return { status: RESPONSE_STATUS.CREATED, message: "Member profile created successfully. Please verify your email." }
  } catch (error: any) {
    const errorMessage  = error.message
    const errorCode = error.code;

    const message = ErrorHandler(errorCode, errorMessage)

    return { message , status: RESPONSE_STATUS.ERROR }
  }
}

export default signUp