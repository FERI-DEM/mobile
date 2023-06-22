import { apiInstance } from './axios';
import {
  CommunityCurrentProductionRes,
  CommunityMembersPowerShareRes, CommunityMonthlyPowerProductionRes, CommunityPowerHistoryReq, CommunityPowerHistoryRes,
  CommunityReq,
  CommunityReqJoin,
  CommunityRes,
  CommunityUpdate,
  JoinCommunityRequestProcess,
} from '../types/community.types';
import {PredictedValue} from "../types/powerPlant.types";

const CommunityService = {
  createCommunity: async (community: CommunityReq) => {
    const response = await apiInstance.post<CommunityRes>(
      'communities',
      community
    );
    return response.data;
  },
  getCommunities: async () => {
    const response = await apiInstance.get<CommunityRes[]>('communities');
    return response.data;
  },
  getCommunity: async (id: string) => {
    const response = await apiInstance.get<CommunityRes>(`communities/${id}`);
    return response.data;
  },
  getCommunityMembersPowerShare: async (id: string) => {
    const response = await apiInstance.get<CommunityMembersPowerShareRes[]>(
      `communities/${id}/members-power-share`
    );
    return response.data;
  },
  getCommunityMonthlyPowerProduction: async (id: string) => {
    const response = await apiInstance.get<CommunityMonthlyPowerProductionRes>(
        `communities/power-production/${id}`
    );
    return response.data;
  },
  deleteCommunity: async (id: string) => {
    const response = await apiInstance.delete<unknown>(`communities/${id}`);
    return response.data;
  },
  joinCommunity: async (community: CommunityReqJoin) => {
    const response = await apiInstance.post<CommunityRes>(
      `communities/request-to-join`,
      community
    );
    return response.data;
  },
  processJoinCommunity: async (data: JoinCommunityRequestProcess) => {
    const response = await apiInstance.patch<unknown>(
      `communities/process-request`,
      data
    );
    return response.data;
  },
  removeCommunityMember: async (
    id: string,
    memberId: string,
    powerPlantId: string
  ) => {
    const response = await apiInstance.delete<unknown>(
      `communities/remove/${id}/${memberId}`,
      { data: { powerPlantIds: [powerPlantId] } }
    );
    return response.data;
  },
  getPredictionByDays: async (id: string) => {
    const response = await apiInstance.get<number[]>(
      `communities/predict-by-days/${id}`
    );
    return response.data;
  },
  update: async (community: CommunityUpdate, id: string) => {
    const response = await apiInstance.patch(`communities/${id}`, community);
    return response.data;
  },
  getMembersCurrentProduction: async (id: string) => {
    const response = await apiInstance.get<CommunityCurrentProductionRes>(
      `communities/current-production/${id}`
    );
    return response.data;
  },
  leaveCommunity: async (id: string, powerPlantId: string) => {
    const response = await apiInstance.delete<unknown>(
      `communities/leave/${id}`,
      { data: { powerPlantIds: [powerPlantId] } }
    );
    return response.data;
  },
  getPrediction: async (id: string) => {
    const response = await apiInstance.get<PredictedValue[]>(
      `communities/predict-power-production/${id}`
    );
    return response.data;
  },
  getHistory: async (id: string, data: CommunityPowerHistoryReq) => {
    const response = await apiInstance.get<CommunityPowerHistoryRes[]>(
      `communities/history/${id}`, {params: {
            dateFrom: data.from.toISOString(),
            dateTo: data.to.toISOString(),
          },}
    );
    return response.data;
  }
};

export default CommunityService;
