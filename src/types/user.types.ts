import * as z from "zod";
import {BaseRegisterSchema, RegisterDetailsSchema} from "../schemas/user.schema";

export type BaseRegisterType = z.infer<typeof BaseRegisterSchema>

export type RegisterDetailsType = z.infer<typeof RegisterDetailsSchema>

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