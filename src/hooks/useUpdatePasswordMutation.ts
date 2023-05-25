import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import {updatePasswordIfUserExists} from "../config/firebase";
import {AxiosError} from "axios";

const useUpdatePasswordMutation = (options?: UseMutationOptions<any, AxiosError, string>) => useMutation<any, AxiosError, string>(
    [QueryKey.UPDATE_PASSWORD], (password) => updatePasswordIfUserExists(password), options
);

export default useUpdatePasswordMutation;