import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import {CommunityReq, CommunityRes} from "../types/community.types";
import CommunityService from "../api/community.service";

const useCommunityMutation = (options: UseMutationOptions<CommunityRes, AxiosError, CommunityReq>) => useMutation<CommunityRes, AxiosError, CommunityReq>(
    [QueryKey.COMMUNITY_MUTATION], (community) => CommunityService.createCommunity(community),
);

export default useCommunityMutation;