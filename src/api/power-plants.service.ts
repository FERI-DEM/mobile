import {apiInstance} from "./axios";
import {CalibrationReq, PowerPlantCreateReq, PowerPlantRes} from "../types/powerPlant.types";

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
    },
    create: async (powerPlant: PowerPlantCreateReq) => {
        const response = await apiInstance.post(`power-plants`, powerPlant)
        return response.data
    }
}

export default PowerPlantsService;