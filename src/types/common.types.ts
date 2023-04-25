export interface ApiError {
    error: string;
    method: string;
    path: string;
    statusCode: number;
    timestamp: string;
}

export enum FormMessageType {
    DEFAULT = '',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface FormMessage {
    type: string;
    text: string;
}