import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {MutationKey} from "../types/keys.types";
import {AuthError, signInWithEmailAndPassword, UserCredential} from "firebase/auth";
import {auth} from "../config/firebase";
import {SignInCredentialsType} from "../types/user.types";

const useSignIn = (options?: UseMutationOptions<UserCredential, AuthError, SignInCredentialsType>) => useMutation<UserCredential, AuthError, SignInCredentialsType>(
    [MutationKey.SIGN_IN], (credentials: SignInCredentialsType) => signInWithEmailAndPassword(auth, credentials.email, credentials.password), options
);
export default useSignIn;