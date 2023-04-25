import {QueryKey} from "../types/queryKey.types";
import {useQuery} from "@tanstack/react-query";
import { PowerPlantRes} from "../types/powerPlant.types";
import PowerPlantsService from "../api/power-plants.service";
import {ApiError} from "../types/common.types";

const usePowerPlant = (id: string) => useQuery<PowerPlantRes, ApiError>(
    [QueryKey.POWER_PLANT], () => PowerPlantsService.getPowerPlant(id),
);
export default usePowerPlant;