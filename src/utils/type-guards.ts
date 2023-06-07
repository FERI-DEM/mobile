import {AuthError} from "firebase/auth";

export function isFirebaseAuthError(error: any): error is AuthError {
    return (error as AuthError).name !== undefined
}