import {apiInstance} from "./axios";
import {CommunityReq, CommunityRes} from "../types/community.types";

const CommunityService = {
    createCommunity: async (community: CommunityReq) => {
        const response = await apiInstance.post<CommunityRes>('communities', community)
        return response.data
    },
}

export default CommunityService;