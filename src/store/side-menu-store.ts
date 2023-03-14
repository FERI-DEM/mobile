import { create } from 'zustand'

interface SideMenuState {
    opened: boolean
    setOpened: (state: boolean) => void
    toggleOpened: () => void
}
export const useSideMenuStore = create<SideMenuState>((set) => ({
    opened: false,
    setOpened: (state: boolean) => set({ opened: state }),
    toggleOpened: () => set((state) => ({ opened: !state.opened })),
}))