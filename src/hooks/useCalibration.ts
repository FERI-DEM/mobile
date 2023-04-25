import {useMutation} from "@tanstack/react-query";
import {CalibrationReq, PowerPlantRes} from "../types/powerPlant.types";
import PowerPlantsService from "../api/power-plants.service";
import {QueryKey} from "../types/queryKey.types";
import {ApiError} from "../types/common.types";

const useCalibration = () => useMutation<PowerPlantRes, ApiError, CalibrationReq>(
[QueryKey.CALIBRATION], (calibration) => PowerPlantsService.calibration(calibration),
);

export default useCalibration;