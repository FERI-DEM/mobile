import * as z from "zod";
import {
    AddPowerPlantSchema,
    BaseRegisterSchema,
    ChangePasswordSchema,
    ForgotPasswordSchema,
    SignInCredentialsSchema
} from "../schemas/user.schema";

export type BaseRegisterType = z.infer<typeof BaseRegisterSchema>

export type AddPowerPlantType = z.infer<typeof AddPowerPlantSchema>

export type SignInCredentialsType = z.infer<typeof SignInCredentialsSchema>

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>

// Maribor: long: 15.646, lat: 46.554
export interface Coordinates {
    latitude: number;
    longitude: number;
}


export interface UserLocation {
    address?: string;
    coordinates?: Coordinates;
}

export enum UserState {
    USER = 'user',
    NO_USER = 'noUser',
    LOADING = 'loading',
    INCOMPLETE_USER = 'incompleteUser'
}