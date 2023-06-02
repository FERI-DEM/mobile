import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import powerPlantsService from "../api/power-plants.service";
import {ApiError} from "../types/common.types";

const usePredictionByDays = (id: string, options: UseQueryOptions<number[], ApiError>) => useQuery<number[], ApiError>(
    [QueryKey.PREDICTION_BY_DAYS, id], () => powerPlantsService.getPredictionByDays(id), options
)

export default usePredictionByDays