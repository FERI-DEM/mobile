import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {CommunityReqJoin, CommunityRes} from "../types/community.types";
import {AxiosError} from "axios";
import {MutationKey} from "../types/keys.types";
import CommunityService from "../api/community.service";

const useCommunityJoinMutation = (options?: UseMutationOptions<CommunityRes, AxiosError, CommunityReqJoin>) => useMutation<CommunityRes, AxiosError, CommunityReqJoin>(
    [MutationKey.CREATE_JOIN_COMMUNITY_REQUEST], (community) => CommunityService.joinCommunity(community), options
);

export default useCommunityJoinMutation;