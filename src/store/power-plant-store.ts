import {create} from "zustand";

interface PowerPlant {
    id: string
    name: string
}

interface PowerPlantState {
    selectedPowerPlant: PowerPlant
    setSelectedPowerPlant: (selectedPowerPlant: PowerPlant) => void
}

export const usePowerPlantStore = create<PowerPlantState>((set) => ({
    selectedPowerPlant: {
        id: '64358df692af515dca30cb9b',
        name: 'Moja elektrarna'
    },
    setSelectedPowerPlant: (selectedPowerPlant: PowerPlant) => set({selectedPowerPlant: selectedPowerPlant}),
}))