import {CommunityRes} from "../types/community.types";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import CommunityService from "../api/community.service";
import {useQuery} from "@tanstack/react-query";

const useCommunity = (id: string) => useQuery<CommunityRes, AxiosError>(
    [QueryKey.COMMUNITY], () => CommunityService.getCommunity(id),
);
export default useCommunity;