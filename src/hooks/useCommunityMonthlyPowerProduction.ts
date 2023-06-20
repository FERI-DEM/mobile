import { CommunityMonthlyPowerProductionRes} from '../types/community.types';
import { QueryKey } from '../types/keys.types';
import CommunityService from '../api/community.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from '../types/common.types';

const useCommunityMonthlyPowerProduction = (
    id: string,
    options?: UseQueryOptions<CommunityMonthlyPowerProductionRes, ApiError>
) =>
    useQuery<CommunityMonthlyPowerProductionRes, ApiError>(
        [QueryKey.COMMUNITY_MONTHLY_POWER_PRODUCTION, id],
        () => CommunityService.getCommunityMonthlyPowerProduction(id),
        options
    );
export default useCommunityMonthlyPowerProduction;
