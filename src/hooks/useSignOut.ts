import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import {signOut} from "firebase/auth";
import {auth} from "../config/firebase";

const useSignOut = (options?: UseMutationOptions) => useMutation(
    [QueryKey.SIGN_OUT], () => signOut(auth),
);

export default useSignOut;