import {CommunityMembersPowerShareRes} from "../types/community.types";
import {QueryKey} from "../types/keys.types";
import CommunityService from "../api/community.service";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {ApiError} from "../types/common.types";

const useCommunityMembersPowerShare = (id: string, options?: UseQueryOptions<CommunityMembersPowerShareRes[], ApiError>) => useQuery<CommunityMembersPowerShareRes[], ApiError>(
    [QueryKey.COMMUNITY_MEMBERS_POWER_SHARE], () => CommunityService.getCommunityMembersPowerShare(id), options
);
export default useCommunityMembersPowerShare;