import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import PowerPlantsService from "../api/power-plants.service";

const usePowerPlantDeleteMutation = (id: string, options: UseMutationOptions<unknown, AxiosError>) => useMutation<unknown, AxiosError>(
    [QueryKey.POWER_PLANT_DELETE_MUTATION], () => PowerPlantsService.deletePowerPlant(id), options
);

export default usePowerPlantDeleteMutation
