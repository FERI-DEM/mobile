import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {MutationKey} from "../types/keys.types";
import PowerPlantsService from "../api/power-plants.service";

const usePowerPlantDeleteMutation = (id: string, options?: UseMutationOptions<unknown, AxiosError>) => useMutation<unknown, AxiosError>(
    [MutationKey.DELETE_POWER_PLANT], () => PowerPlantsService.deletePowerPlant(id), options
);

export default usePowerPlantDeleteMutation
