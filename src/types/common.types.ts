export interface ApiError {
    message: string;
    method: string;
    path: string;
    statusCode: number;
    timestamp: string;
}

export interface GraphPoint {
    x: number;
    y: number;
}