import * as z from "zod";
import {BaseRegisterSchema, ChangePasswordSchema, LoginSchema, RegisterDetailsSchema} from "../schemas/user.schema";

export type BaseRegisterType = z.infer<typeof BaseRegisterSchema>

export type RegisterDetailsType = z.infer<typeof RegisterDetailsSchema>

export type LoginType = z.infer<typeof LoginSchema>

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>

// Maribor: long: 15.646, lat: 46.554
export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface User {
    token?: string;
    coordinates?: Coordinates;
}

export interface UserLocation {
    address?: string;
    coordinates?: Coordinates;
}