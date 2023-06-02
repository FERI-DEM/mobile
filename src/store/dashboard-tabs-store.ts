import {create} from "zustand";

export enum PowerPlantsTab {
    DASHBOARD = 'Nadzorna plošča',
    CALIBRATION = 'Kalibracija',
    SETTINGS = 'Nastavitve',
}
interface DashboardTabsState {
    activeTab: PowerPlantsTab
    setActiveTab: (activeTab: PowerPlantsTab) => void
}
export const useDashboardTabsStore = create<DashboardTabsState>((set) => ({
    activeTab: PowerPlantsTab.DASHBOARD,
    setActiveTab: (activeTab: PowerPlantsTab) => set({activeTab}),
}))