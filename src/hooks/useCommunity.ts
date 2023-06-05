import {CommunityRes} from "../types/community.types";
import {QueryKey} from "../types/keys.types";
import CommunityService from "../api/community.service";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {ApiError} from "../types/common.types";

const useCommunity = (id: string, options?: UseQueryOptions<CommunityRes, ApiError>) => useQuery<CommunityRes, ApiError>(
    [QueryKey.COMMUNITY], () => CommunityService.getCommunity(id), options
);
export default useCommunity;