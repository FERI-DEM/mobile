import {QueryKey} from "../types/keys.types";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {PowerPlantRes} from "../types/powerPlant.types";
import PowerPlantsService from "../api/power-plants.service";
import {ApiError} from "../types/common.types";

const usePowerPlant = (id: string, options?: UseQueryOptions<PowerPlantRes, ApiError>) => {
    return useQuery<PowerPlantRes, ApiError>(
        [QueryKey.POWER_PLANT, id], () => PowerPlantsService.getPowerPlant(id), options
    )
};
export default usePowerPlant;