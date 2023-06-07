import {apiInstance} from "./axios";
import {
    CommunityMembersPowerShareRes,
    CommunityReq,
    CommunityReqJoin,
    CommunityRes,
    JoinCommunityRequestProcess
} from "../types/community.types";

const CommunityService = {
    createCommunity: async (community: CommunityReq) => {
        const response = await apiInstance.post<CommunityRes>('communities', community)
        return response.data
    },
    getCommunities: async () => {
        const response = await apiInstance.get<CommunityRes[]>('communities')
        return response.data
    },
    getCommunity: async (id: string) => {
        const response = await apiInstance.get<CommunityRes>(`communities/${id}`)
        return response.data
    },
    getCommunityMembersPowerShare: async (id: string) => {
        const response = await apiInstance.get<CommunityMembersPowerShareRes[]>(`communities/${id}/members-power-share`)
        return response.data
    },
    deleteCommunity: async (id: string) => {
        const response = await apiInstance.delete<unknown>(`communities/${id}`)
        return response.data
    },
    joinCommunity: async (community: CommunityReqJoin) => {
      const response = await apiInstance.post<CommunityRes>(`communities/request-to-join`, community)
      return response.data
    },
    processJoinCommunity: async (data: JoinCommunityRequestProcess) => {
        const response = await apiInstance.patch<unknown>(`communities/process-request`, data)
        return response.data
    },
    removeCommunityMember: async (id: string, memberId: string) => {
        const response = await apiInstance.delete<unknown>(`communities/remove/${id}/${memberId}`)
        return response.data
    }
}

export default CommunityService;