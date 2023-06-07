import {useMutation} from "@tanstack/react-query";
import {MutationKey} from "../types/keys.types";
import {signOut} from "firebase/auth";
import {auth} from "../config/firebase";

const useSignOut = () => useMutation(
    [MutationKey.SIGN_OUT], () => signOut(auth),
);

export default useSignOut;