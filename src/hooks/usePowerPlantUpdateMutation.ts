import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {MutationKey} from "../types/keys.types";
import PowerPlantsService from "../api/power-plants.service";
import {PowerPlant, PowerPlantCreateReq} from "../types/powerPlant.types";

const usePowerPlantUpdateMutation = (id: string, options?: UseMutationOptions<PowerPlant, AxiosError, PowerPlantCreateReq>) => useMutation<PowerPlant, AxiosError, PowerPlantCreateReq>(
    [MutationKey.UPDATE_POWER_PLANT], (powerPlant) => PowerPlantsService.update(powerPlant, id), options
);

export default usePowerPlantUpdateMutation;