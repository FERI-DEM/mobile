import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKey } from '../types/keys.types';
import { ApiError } from '../types/common.types';
import communityService from '../api/community.service';
import { CommunityCurrentProductionRes } from '../types/community.types';

const useCommunityMembersCurrentProduction = (
  id: string,
  options?: UseQueryOptions<CommunityCurrentProductionRes, ApiError>
) =>
  useQuery<CommunityCurrentProductionRes, ApiError>(
    [QueryKey.COMMUNITIES_MEMBERS_CURRENT_PRODUCTION, id],
    () => communityService.getMembersCurrentProduction(id),
    options
  );

export default useCommunityMembersCurrentProduction;
