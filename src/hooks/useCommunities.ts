import {useQuery} from "@tanstack/react-query";
import {CommunityRes} from "../types/community.types";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import CommunityService from "../api/community.service";

const useCommunities = () => useQuery<CommunityRes[], AxiosError>(
    [QueryKey.COMMUNITIES], () => CommunityService.getCommunities(),
);
export default useCommunities;