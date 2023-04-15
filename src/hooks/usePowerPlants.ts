import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import PowerPlantsService from "../api/power-plants.service";
import {PowerPlant} from "../types/powerPlant.types";

const usePowerPlants = () => useQuery<PowerPlant[], AxiosError>(
    [QueryKey.POWER_PLANTS], () => PowerPlantsService.getPowerPlants(),
);
export default usePowerPlants;