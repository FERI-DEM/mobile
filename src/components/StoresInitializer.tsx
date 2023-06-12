import {useEffect} from 'react';
import {usePowerPlantStore} from '../store/power-plant-store';
import {useCommunityStore} from '../store/community-store';
import usePowerPlants from '../hooks/usePowerPlants';
import useCommunities from '../hooks/useCommunities';
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import {ActivityIndicator, View} from "react-native";

const StoresInitializer = () => {
  const { setSelectedPowerPlant, selectedPowerPlant } = usePowerPlantStore();
  const { setSelectedCommunity, selectedCommunity } = useCommunityStore();
  const { data: powerPlants, isLoading: arePowerPlantsLoading } = usePowerPlants();
  const { data: communities, isLoading: areCommunitiesLoading } = useCommunities();

  useEffect(() => {
    if(arePowerPlantsLoading || areCommunitiesLoading) return;

    if (communities && communities.length > 0 && !selectedCommunity) {
      setSelectedCommunity({
        id: communities[0]._id,
        name: communities[0].name,
      });
    }
    console.log(powerPlants)
    if (powerPlants && powerPlants.length > 0 && !selectedPowerPlant) {
      setSelectedPowerPlant({
        id: powerPlants[0]._id,
        name: powerPlants[0].displayName,
      });
      navigate(Routes.DASHBOARD)
    }
    else if(!powerPlants || powerPlants.length === 0) {
      navigate(Routes.ADD_POWER_PLANT)
    }
  }, [powerPlants, communities, setSelectedPowerPlant, setSelectedCommunity, areCommunitiesLoading, arePowerPlantsLoading]);

  return <View className='flex-1 bg-dark-main items-center justify-center'>
    <ActivityIndicator size={35} color="white" />
  </View>;
};
export default StoresInitializer;
