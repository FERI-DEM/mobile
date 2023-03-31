export interface CalibrationReq {
    id: string;
    power: number;
}

export interface PowerPlantRes {
    _id: string;
    powerPlants: PowerPlant[];
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