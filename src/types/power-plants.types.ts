export interface CalibrationReq {
    id: string;
    power: number;
}

export interface PowerPlantRes {
    _id: string;
    powerPlants: PowerPlant[];
}

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    powerPlants: PowerPlant[]
}

interface PowerPlant {
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