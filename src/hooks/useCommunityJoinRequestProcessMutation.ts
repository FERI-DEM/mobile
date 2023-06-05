import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {JoinCommunityRequestProcess} from "../types/community.types";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import CommunityService from "../api/community.service";

const useCommunityJoinRequestProcessMutation = (options?: UseMutationOptions<unknown, AxiosError, JoinCommunityRequestProcess>) => useMutation<unknown, AxiosError, JoinCommunityRequestProcess>(
    [QueryKey.JOIN_COMMUNITY_PROCESS], (data) => CommunityService.processJoinCommunity(data), options
);

export default useCommunityJoinRequestProcessMutation;