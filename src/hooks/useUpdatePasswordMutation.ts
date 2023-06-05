import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {MutationKey} from "../types/keys.types";
import {updatePasswordIfUserExists} from "../config/firebase";
import {AxiosError} from "axios";

const useUpdatePasswordMutation = (options?: UseMutationOptions<any, AxiosError, string>) => useMutation<any, AxiosError, string>(
    [MutationKey.UPDATE_PASSWORD], (password) => updatePasswordIfUserExists(password), options
);

export default useUpdatePasswordMutation;