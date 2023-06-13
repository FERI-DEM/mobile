import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CalibrationReq, PowerPlantRes } from '../types/powerPlant.types';
import PowerPlantsService from '../api/power-plants.service';
import { MutationKey } from '../types/keys.types';
import { ApiError } from '../types/common.types';

const useCalibrationMutation = (options?: UseMutationOptions<PowerPlantRes, ApiError, CalibrationReq>) => useMutation<PowerPlantRes, ApiError, CalibrationReq>(
[MutationKey.CALIBRATION], (calibration) => PowerPlantsService.calibration(calibration), options
);

export default useCalibrationMutation;