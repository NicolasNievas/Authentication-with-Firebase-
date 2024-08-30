export interface AuthResponse <T>{
    response?: T;
    status: number;
    message?: string;
}

export enum LOGIN_VIEW{
    SIGN_IN = "sign-in",
    REGISTER = "register",
    FORGOT_PASSWORD = "forgot-password"
}

export enum RESPONSE_STATUS{
    SUCCESS = 200,
    CREATED = 201,
    ERROR = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}