import {create} from "zustand";

interface PowerPlant {
    id: string
    name: string
}

interface PowerPlantState {
    selectedPowerPlant: PowerPlant | null
    setSelectedPowerPlant: (selectedPowerPlant: PowerPlant) => void
}

export const usePowerPlantStore = create<PowerPlantState>((set) => ({
    selectedPowerPlant: null,
    setSelectedPowerPlant: (selectedPowerPlant: PowerPlant) => set({selectedPowerPlant: selectedPowerPlant}),
}))