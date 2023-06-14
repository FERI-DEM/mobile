import { apiInstance } from './axios';
import {
  CalibrationReq,
  PowerPlant,
  PowerPlantCreateReq,
  PowerPlantPowerHistoryReq,
  PowerPlantPowerHistoryRes,
  PowerPlantRes,
  PredictedValue,
} from '../types/powerPlant.types';

const PowerPlantsService = {
    getPowerPlants: async () => {
        const response = await apiInstance.get<PowerPlantRes>('power-plants')
        return response.data.powerPlants as PowerPlant[]
    },
    getPowerPlant: async (id: string) => {
        const response = await apiInstance.get<PowerPlantRes>(`power-plants/${id}`)
        return response.data
    },
    calibration: async (calibration: CalibrationReq) => {
        const response = await apiInstance.post<PowerPlantRes>(`power-plants/calibrate/${calibration.id}`, {power: calibration.power})
        return response.data
    },
    getPrediction: async (id: string) => {
        const response = await apiInstance.get<PredictedValue[]>(`power-plants/predict/${id}`)
        return response.data
    },
    getPredictionByDays: async (id: string) => {
        const response = await apiInstance.get<number[]>(`power-plants/predict-by-days/${id}`)
        return response.data
    },
    getHistory: async (data: PowerPlantPowerHistoryReq) => {
        const response = await apiInstance.get<PowerPlantPowerHistoryRes[]>(`power-plants/history`, {
            params: {
                dateFrom: data.from.toISOString(),
                dateTo: data.to.toISOString(),
                powerPlantIds: [data.id]
            }
        })
        return response.data
    },
    create: async (powerPlant: PowerPlantCreateReq) => {
        const response = await apiInstance.post(`power-plants`, powerPlant)
        return response.data
    },
    update: async (powerPlant: PowerPlantCreateReq, id:string) => {
        const response = await apiInstance.patch(`power-plants/${id}`, powerPlant)
        return response.data
    },
    deletePowerPlant: async (id: string) => {
        const response = await apiInstance.delete<unknown>(`power-plants/${id}`)
        return response.data
    }
}

export default PowerPlantsService;