import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {MutationKey} from "../types/keys.types";
import CommunityService from "../api/community.service";

const useCommunityDeleteMutation = (id: string, options?: UseMutationOptions<unknown, AxiosError>) => useMutation<unknown, AxiosError>(
    [MutationKey.DELETE_COMMUNITY], () => CommunityService.deleteCommunity(id), options
);

export default useCommunityDeleteMutation;