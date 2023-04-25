import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import CommunityService from "../api/community.service";

const useCommunityDeleteMutation = (id: string, options: UseMutationOptions<unknown, AxiosError>) => useMutation<unknown, AxiosError>(
    [QueryKey.COMMUNITY_DELETE_MUTATION], (community) => CommunityService.deleteCommunity(id), options
);

export default useCommunityDeleteMutation;