import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {JoinCommunityRequestProcess} from "../types/community.types";
import {AxiosError} from "axios";
import {MutationKey} from "../types/keys.types";
import CommunityService from "../api/community.service";

const useCommunityJoinRequestProcessMutation = (options?: UseMutationOptions<unknown, AxiosError, JoinCommunityRequestProcess>) => useMutation<unknown, AxiosError, JoinCommunityRequestProcess>(
    [MutationKey.PROCESS_JOIN_COMMUNITY_REQUEST], (data) => CommunityService.processJoinCommunity(data), options
);

export default useCommunityJoinRequestProcessMutation;