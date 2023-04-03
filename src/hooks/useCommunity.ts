import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import {CommunityReq, CommunityRes} from "../types/community.types";
import CommunityService from "../api/community.service";

const useCommunity = () => useMutation<CommunityRes, AxiosError, CommunityReq>(
    [QueryKey.COMMUNITY], (community) => CommunityService.createCommunity(community),
);

export default useCommunity;