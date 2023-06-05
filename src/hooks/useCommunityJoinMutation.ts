import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {CommunityReqJoin, CommunityRes} from "../types/community.types";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import CommunityService from "../api/community.service";

const useCommunityJoinMutation = (options?: UseMutationOptions<CommunityRes, AxiosError, CommunityReqJoin>) => useMutation<CommunityRes, AxiosError, CommunityReqJoin>(
    [QueryKey.JOIN_COMMUNITY], (community) => CommunityService.joinCommunity(community), options
);

export default useCommunityJoinMutation;