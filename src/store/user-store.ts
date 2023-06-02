import {create} from "zustand";
import {User} from "firebase/auth";
import {UserState as UserStateType} from "../types/user.types";


interface UserState {
    user: User | undefined;
    userState: UserStateType;
    setUser: (user: User | undefined) => void;
    setUserState: (userState: UserStateType) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    userState: UserStateType.LOADING,
    setUser: (user: User | undefined) => set({ user }),
    setUserState: (userState: UserStateType) => set({ userState })
}));