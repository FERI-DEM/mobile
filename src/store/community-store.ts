import {create} from "zustand";

interface Community {
    id: string
    name: string
}

interface CommunityState {
    selectedCommunity: Community | null
    setSelectedCommunity: (selectedCommunity: Community) => void
}

export const useCommunityStore = create<CommunityState>((set) => ({
    selectedCommunity: null,
    setSelectedCommunity: (selectedCommunity: Community) => set({selectedCommunity: selectedCommunity}),
}))