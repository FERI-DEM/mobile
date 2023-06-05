import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {MutationKey} from "../types/keys.types";
import {CommunityReq, CommunityRes} from "../types/community.types";
import CommunityService from "../api/community.service";

const useCommunityMutation = (options?: UseMutationOptions<CommunityRes, AxiosError, CommunityReq>) => useMutation<CommunityRes, AxiosError, CommunityReq>(
    [MutationKey.CREATE_COMMUNITY], (community) => CommunityService.createCommunity(community),
);

export default useCommunityMutation;