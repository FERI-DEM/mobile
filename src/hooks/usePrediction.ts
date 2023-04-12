import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";
import {PredictionRes} from "../types/powerPlant.types";
import powerPlantsService from "../api/power-plants.service";

const usePrediction = (id: string) => useQuery<PredictionRes, AxiosError>(
    [QueryKey.PREDICTION, id], () => powerPlantsService.getPrediction(id),
)

export default usePrediction