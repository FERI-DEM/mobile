import {QueryKey} from "../types/keys.types";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {PowerPlantPowerHistoryReq, PowerPlantPowerHistoryRes} from "../types/powerPlant.types";
import PowerPlantsService from "../api/power-plants.service";
import {ApiError} from "../types/common.types";

const usePowerPlantPowerHistory = (data: PowerPlantPowerHistoryReq, options?: UseQueryOptions<PowerPlantPowerHistoryRes[], ApiError>) => {
    return useQuery<PowerPlantPowerHistoryRes[], ApiError>(
        [QueryKey.POWER_PLANT_POWER_HISTORY, data], () => PowerPlantsService.getHistory(data), options
    )
};
export default usePowerPlantPowerHistory;