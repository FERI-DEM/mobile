export interface ApiError {
    message: string;
    method: string;
    path: string;
    statusCode: number;
    timestamp: string;
}