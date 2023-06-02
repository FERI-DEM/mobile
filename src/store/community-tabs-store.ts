import {create} from "zustand";

export enum CommunityTab {
    DASHBOARD = 'dashboard',
    SETTINGS = 'settings',
}
interface CommunityTabsState {
    activeTab: CommunityTab
    setActiveTab: (activeTab: CommunityTab) => void
}
export const useCommunityTabsStore = create<CommunityTabsState>((set) => ({
    activeTab: CommunityTab.DASHBOARD,
    setActiveTab: (activeTab: CommunityTab) => set({activeTab}),
}))