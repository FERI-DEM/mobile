import { QueryKey } from '../types/keys.types';
import { useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { PowerPlantPowerHistoryRes } from '../types/powerPlant.types';
import PowerPlantsService from '../api/power-plants.service';
import { ApiError } from '../types/common.types';

const createHistoryRequest = (page: number, powerPlantId: string) => {
  console.log('page', page);
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - page);
  const dateTo = new Date();
  dateTo.setDate(dateTo.getDate() - (page - 1));
  return {
    id: powerPlantId,
    from: dateFrom,
    to: dateTo,
  };
};

const usePowerPlantPowerHistory = (
  powerPlantId: string,
  options?: UseQueryOptions<PowerPlantPowerHistoryRes[], ApiError>
) => {
  return useInfiniteQuery<PowerPlantPowerHistoryRes[], ApiError>(
    [QueryKey.POWER_PLANT_POWER_HISTORY, powerPlantId],
    ({ pageParam = 1 }) =>
      PowerPlantsService.getHistory(
        createHistoryRequest(pageParam, powerPlantId)
      ),
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    }
  );
};
export default usePowerPlantPowerHistory;
