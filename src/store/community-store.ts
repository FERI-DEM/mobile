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
        id: '64367402513d8b1ce1514e58',
        name: 'Moja organizacija'
    },
    setSelectedCommunity: (selectedCommunity: Community) => set({selectedCommunity: selectedCommunity}),
}))