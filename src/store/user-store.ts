import {create} from "zustand";
import {BaseRegisterType, Coordinates, RegisterDetailsType, User} from "../types/user.types";

type UserState = User & {
    setToken: (token: string) => void
    setCoordinates: (location: Coordinates) => void
}

export const useUserStore = create<UserState>((set) => ({
    setToken: (token: string) => set({token}),
    setCoordinates: (location: Coordinates) => set({coordinates: location}),
}))