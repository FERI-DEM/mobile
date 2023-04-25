import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import PowerPlantsService from "../api/power-plants.service";
import {PowerPlant, PowerPlantCreateReq} from "../types/powerPlant.types";

const usePowerPlantUpdateMutation = (id: string, options: UseMutationOptions<PowerPlant, AxiosError, PowerPlantCreateReq>) => useMutation<PowerPlant, AxiosError, PowerPlantCreateReq>(
    [QueryKey.POWER_PLANT_UPDATE_MUTATION], (powerPlant) => PowerPlantsService.update(powerPlant, id), options
);

export default usePowerPlantUpdateMutation;