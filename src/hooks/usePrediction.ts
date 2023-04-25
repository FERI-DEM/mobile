import {useQuery} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import {PredictedValue} from "../types/powerPlant.types";
import powerPlantsService from "../api/power-plants.service";
import {ApiError} from "../types/common.types";

const usePrediction = (id: string) => useQuery<PredictedValue[], ApiError>(
    [QueryKey.PREDICTION, id], () => powerPlantsService.getPrediction(id),
)

export default usePrediction