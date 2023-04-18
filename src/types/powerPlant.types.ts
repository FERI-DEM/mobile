import {z} from "zod";
import {CalibrationDataSchema} from "../schemas/calibration.schema";

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
    coefficient: number;
    predictedProduction: number;
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

export interface PredictionRes {
    _id: string;
    data: []
}

export type CalibrationDataType = z.infer<typeof CalibrationDataSchema>