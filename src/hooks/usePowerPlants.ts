import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import {PowerPlantRes} from "../types/powerPlant.types";
import powerPlantsService from "../api/power-plants.service";

const usePowerPlants = () => useQuery<PowerPlantRes, AxiosError>(
    [QueryKey.POWER_PLANTS], () => powerPlantsService.getPowerPlants(),
)

export default usePowerPlants