import {AxiosError} from "axios";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import CommunityService from "../api/community.service";
import {QueryKey} from "../types/queryKey.types";


const useCommunityRemoveMemberMutation = (id: string, memberId: string, options: UseMutationOptions<unknown, AxiosError>) => useMutation<unknown, AxiosError>(
    [QueryKey.COMMUNITY_REMOVE_MEMBER_MUTATION], () => CommunityService.removeCommunityMember(id, memberId), options
);

export default useCommunityRemoveMemberMutation;