import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {MutationKey} from "../types/keys.types";
import {PowerPlant, PowerPlantCreateReq} from "../types/powerPlant.types";
import PowerPlantsService from "../api/power-plants.service";

const useRegisterDetailsMutation = (options?: UseMutationOptions<PowerPlant, AxiosError, PowerPlantCreateReq>) => useMutation<PowerPlant, AxiosError, PowerPlantCreateReq>(
    [MutationKey.CREATE_POWER_PLANT], (powerPlant) => PowerPlantsService.create(powerPlant), options
);
export default useRegisterDetailsMutation