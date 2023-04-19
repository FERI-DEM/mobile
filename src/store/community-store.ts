import {create} from "zustand";

interface Community {
    id: string
    name: string
}

interface CommunityState {
    selectedCommunity: Community
    setSelectedCommunity: (selectedCommunity: Community) => void
}

export const useCommunityStore = create<CommunityState>((set) => ({
    selectedCommunity: {
        id: '643db686f4307cba642c8b30',
        name: 'Moja organizacija'
    },
    setSelectedCommunity: (selectedCommunity: Community) => set({selectedCommunity: selectedCommunity}),
}))