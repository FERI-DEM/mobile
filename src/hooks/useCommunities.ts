import {useQuery} from "@tanstack/react-query";
import {CommunityRes} from "../types/community.types";
import {QueryKey} from "../types/keys.types";
import CommunityService from "../api/community.service";
import {ApiError} from "../types/common.types";

const useCommunities = () => useQuery<CommunityRes[], ApiError>(
    [QueryKey.COMMUNITIES], () => CommunityService.getCommunities(),
);
export default useCommunities;