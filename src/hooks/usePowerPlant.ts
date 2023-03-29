import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {CalibrationReq, PowerPlantRes} from "../types/power-plants.types";
import PowerPlantsService from "../api/power-plants.service";
import {QueryKey} from "../types/queryKey.types";

const useCalibration = () => useMutation<PowerPlantRes, AxiosError, CalibrationReq>(
[QueryKey.CALIBRATION], (calibration) => PowerPlantsService.calibration(calibration),
);

export default useCalibration;