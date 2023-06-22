import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKey } from '../types/keys.types';
import { ApiError } from '../types/common.types';
import communityService from '../api/community.service';

const useCommunitiesPredictionByDays = (
  id: string,
  options?: UseQueryOptions<number[], ApiError>
) =>
  useQuery<number[], ApiError>(
    [QueryKey.COMMUNITIES_POWER_PREDICTION_BY_DAYS, id],
    () => communityService.getPredictionByDays(id),
    options
  );

export default useCommunitiesPredictionByDays;
