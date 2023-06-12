import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {CommunityRes} from "../types/community.types";
import {QueryKey} from "../types/keys.types";
import CommunityService from "../api/community.service";
import {ApiError} from "../types/common.types";

const useCommunities = (options?: UseQueryOptions<CommunityRes[], ApiError>) => useQuery<CommunityRes[], ApiError>(
    [QueryKey.COMMUNITIES], () => CommunityService.getCommunities(), {
        ...options,
        retry: false
    }
);
export default useCommunities;