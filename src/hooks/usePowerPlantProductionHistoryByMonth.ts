import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKey } from '../types/keys.types';
import { PowerPlantProductionByMonthRes } from '../types/powerPlant.types';
import powerPlantsService from '../api/power-plants.service';
import { ApiError } from '../types/common.types';

const usePowerPlantProductionHistoryByMonth = (
  id: string,
  options?: UseQueryOptions<PowerPlantProductionByMonthRes[], ApiError>
) =>
  useQuery<PowerPlantProductionByMonthRes[], ApiError>(
    [QueryKey.POWER_PLANT_POWER_PREDICTION_BY_MONTHS, id],
    () => powerPlantsService.getHistoryProductionByMonth(id),
    options
  );

export default usePowerPlantProductionHistoryByMonth;
