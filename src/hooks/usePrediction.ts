import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {QueryKey} from "../types/keys.types";
import {PredictedValue} from "../types/powerPlant.types";
import powerPlantsService from "../api/power-plants.service";
import {ApiError} from "../types/common.types";

const usePrediction = (id: string, options?: UseQueryOptions<PredictedValue[], ApiError>) => useQuery<PredictedValue[], ApiError>(
    [QueryKey.POWER_PLANT_POWER_PREDICTION, id], () => powerPlantsService.getPrediction(id), options
)

export default usePrediction