import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import {PowerPlantCreateReq} from "../types/powerPlant.types";
import PowerPlantsService from "../api/power-plants.service";

const useRegisterDetailsMutation = (options?: UseMutationOptions<unknown, AxiosError, PowerPlantCreateReq>) => useMutation<unknown, AxiosError, PowerPlantCreateReq>(
    [QueryKey.REGISTER_DETAILS], (powerPlant) => PowerPlantsService.create(powerPlant), options
);
export default useRegisterDetailsMutation