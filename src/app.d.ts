/// <reference types="nativewind/types" />

declare module "*.png"

declare module '@env' {
    export const FIREBASE_API_KEY: string;
    export const FIREBASE_AUTH_DOMAIN: string;
    export const FIREBASE_DATABASE_URL: string;
    export const FIREBASE_PROJECT_ID: string;
    export const FIREBASE_STORAGE_BUCKET: string;
    export const FIREBASE_APP_ID: string;
    export const FIREBASE_MESSAGING_SENDER_ID: string;
    export const MAPBOX_TOKEN: string;
    export const MAPBOX_URI: string;
    export const GOOGLE_CLIENT_ID: string;
    export const ANDROID_CLIENT_ID: string;
    export const API_URL: string;
}