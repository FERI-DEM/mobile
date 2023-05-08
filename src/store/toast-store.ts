import {create} from "zustand";

interface ToastState {
    isVisible: boolean;
    text: string;
    showToast: (text: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    isVisible: false,
    text: '',
    showToast: (text) => set({ isVisible: true, text }),
}));