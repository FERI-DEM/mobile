import {useQuery} from "@tanstack/react-query";
import {CommunityRes} from "../types/community.types";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import CommunityService from "../api/community.service";

const useCommunity = (id: string) => useQuery<CommunityRes, AxiosError>(
    [QueryKey.COMMUNITY], () => CommunityService.getCommunity(id),
);
export default useCommunity;