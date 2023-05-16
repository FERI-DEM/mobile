import {create} from "zustand";
import {ToastTypes} from "../types/toast.types";

interface ToastState {
    isVisible: boolean;
    type: ToastTypes;
    text: string;
    showToast: (text: string, type: ToastTypes) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    isVisible: false,
    type: ToastTypes.SUCCESS,
    text: '',
    showToast: (text, type) => set({ isVisible: true, text, type}),
}));