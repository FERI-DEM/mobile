import { QueryKey } from '../types/keys.types';
import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { PowerPlantPowerHistoryRes } from '../types/powerPlant.types';
import PowerPlantsService from '../api/power-plants.service';
import { ApiError } from '../types/common.types';
import CommunityService from "../api/community.service";
import {CommunityPowerHistoryReq, CommunityPowerHistoryRes} from "../types/community.types";

const createHistoryRequest = (page: number) => {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - page);
    const dateTo = new Date();
    dateTo.setDate(dateTo.getDate() - (page - 1));
    return {
        from: dateFrom,
        to: dateTo,
    };
};

const useCommunityPowerHistory = (
    communityId: string,
    options?: UseInfiniteQueryOptions<CommunityPowerHistoryRes[], ApiError>
) => {
    return useInfiniteQuery<CommunityPowerHistoryRes[], ApiError>(
        [QueryKey.COMMUNITY_POWER_HISTORY, communityId],
        ({ pageParam = 1 }) =>
            CommunityService.getHistory(communityId,
                createHistoryRequest(pageParam)
            ),
        {
            getNextPageParam: (lastPage, allPages) => allPages.length + 1,
            ...options,
        }
    );
};
export default useCommunityPowerHistory;
