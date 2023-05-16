import {z} from "zod";
import {CalibrationDataSchema} from "../schemas/calibration.schema";
import {UpdatePowerPlantDataSchema} from "../schemas/powerPlant.schema";

export interface CalibrationReq {
    id: string;
    power: number;
}

export interface PowerPlantRes {
    _id: string;
    powerPlants: PowerPlant[];
}

export interface PowerPlant {
    displayName: string;
    latitude: number;
    longitude: number;
    _id: string;
    calibration: Calibration[];
}

interface Calibration {
    power: number;
    date: string;
    radiation: number;
}

export interface PowerPlantCreateReq {
    displayName: string;
    latitude: number;
    longitude: number;
}

export interface PredictedValue {
    date: string;
    power: number;
}

export type CalibrationDataType = z.infer<typeof CalibrationDataSchema>
export type UpdatePowerPlantDataType = z.infer<typeof UpdatePowerPlantDataSchema>