import {CommunityRes} from "../types/community.types";
import {QueryKey} from "../types/queryKey.types";
import CommunityService from "../api/community.service";
import {useQuery} from "@tanstack/react-query";
import {ApiError} from "../types/common.types";

const useCommunity = (id: string) => useQuery<CommunityRes, ApiError>(
    [QueryKey.COMMUNITY], () => CommunityService.getCommunity(id),
);
export default useCommunity;