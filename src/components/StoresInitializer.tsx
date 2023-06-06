import {ReactNode, useEffect} from "react";
import {usePowerPlantStore} from "../store/power-plant-store";
import {useCommunityStore} from "../store/community-store";
import usePowerPlants from "../hooks/usePowerPlants";
import useCommunities from "../hooks/useCommunities";

interface StoresInitializerProps {
    children: ReactNode | ReactNode[]
}
const StoresInitializer = ({children}: StoresInitializerProps) => {
    const setSelectedPowerPlant = usePowerPlantStore((state) => state.setSelectedPowerPlant);
    const setSelectedCommunity = useCommunityStore((state) => state.setSelectedCommunity);
    const {data: powerPlants} = usePowerPlants();
    const {data: communities} = useCommunities()

    useEffect(() => {
        if (powerPlants && powerPlants.length > 0) {
            setSelectedPowerPlant({id: powerPlants[0]._id, name: powerPlants[0].displayName})
        }
        if(communities && communities.length > 0){
            setSelectedCommunity({id: communities[0]._id, name: communities[0].name})
        }
    }, [powerPlants, communities, setSelectedPowerPlant, setSelectedCommunity])
    return <>{children}</>
}
export default StoresInitializer;