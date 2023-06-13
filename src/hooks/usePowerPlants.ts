import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {QueryKey} from "../types/keys.types";
import PowerPlantsService from "../api/power-plants.service";
import {PowerPlant} from "../types/powerPlant.types";
import {ApiError} from "../types/common.types";

const usePowerPlants = (options?: UseQueryOptions<PowerPlant[], ApiError>) => useQuery<PowerPlant[], ApiError>(
    [QueryKey.POWER_PLANTS], () => PowerPlantsService.getPowerPlants(), {
        ...options,
        retry: false
    }
);
export default usePowerPlants;