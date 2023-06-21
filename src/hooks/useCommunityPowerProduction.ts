import { QueryKey } from '../types/keys.types';
import CommunityService from '../api/community.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from '../types/common.types';
import {PredictedValue} from "../types/powerPlant.types";

const useCommunityPowerProduction = (
    id: string,
    options?: UseQueryOptions<PredictedValue[], ApiError>
) =>
    useQuery<PredictedValue[], ApiError>(
        [QueryKey.COMMUNITY_POWER_PRODUCTION, id],
        () => CommunityService.getPrediction(id),
        options
    );
export default useCommunityPowerProduction;
