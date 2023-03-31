import {apiInstance} from "./axios";
import {CalibrationReq, PowerPlantRes} from "../types/powerPlant.types";

const PowerPlantsService = {
    getPowerPlants: async () => {
        const response = await apiInstance.get<PowerPlantRes>('power-plants')
        return response.data
    },
    getPowerPlant: async (id: string) => {
        const response = await apiInstance.get<PowerPlantRes>(`power-plants/${id}`)
        return response.data
    },
    calibration: async (calibration: CalibrationReq) => {
        const response = await apiInstance.post<PowerPlantRes>(`power-plants/calibrate/${calibration.id}`, {power: calibration.power})
        return response.data
    }
}

export default PowerPlantsService;