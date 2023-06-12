import { ReactNode, useEffect } from 'react';
import { usePowerPlantStore } from '../store/power-plant-store';
import usePowerPlants from '../hooks/usePowerPlants';
import { navigate } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import { ActivityIndicator, View } from 'react-native';

interface StoresInitializerProps {
  children: ReactNode;
}
const StoresInitializer = ({children}: StoresInitializerProps) => {
  const { setSelectedPowerPlant, selectedPowerPlant } = usePowerPlantStore();
  const { data: powerPlants, isLoading: arePowerPlantsLoading } = usePowerPlants();

    useEffect(() => {
      if(powerPlants && !selectedPowerPlant) {
        setSelectedPowerPlant({id: powerPlants[0]._id, name: powerPlants[0].displayName});
        navigate(Routes.DASHBOARD);
      }
    }, [powerPlants])

    if(arePowerPlantsLoading) return <View className='flex-1 bg-dark-main items-center justify-center'>
      <ActivityIndicator size={35} color="white" />
    </View>;

    return <>{children}</>
};
export default StoresInitializer;
