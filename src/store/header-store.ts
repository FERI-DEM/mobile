import {create} from "zustand";

interface HeaderState {
    title: string
    setTitle: (title: string) => void
}
export const useHeaderStore = create<HeaderState>((set) => ({
    title: '',
    setTitle: (title: string) => set({title: title}),
}))