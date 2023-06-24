import { ReactNode, useEffect, useState } from 'react';
import { usePowerPlantStore } from '../store/power-plant-store';
import { Routes } from '../navigation/routes';
import { ActivityIndicator, View } from 'react-native';
import { PowerPlant } from '../types/powerPlant.types';
import PowerPlantsService from '../api/power-plants.service';
import { useQueryClient } from '@tanstack/react-query';

interface StoresInitializerProps {
  children: (initialRoute: Routes) => ReactNode;
}
const AppInitializer = ({ children }: StoresInitializerProps) => {
  const setSelectedPowerPlant = usePowerPlantStore(
    (state) => state.setSelectedPowerPlant
  );
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<PowerPlant>();
  const queryClient = useQueryClient();

  const initializePowerPlants = async () => {
    queryClient.clear();
    setIsLoading(true);
    try {
      const powerPlants = await PowerPlantsService.getPowerPlants();

      if (powerPlants?.length !== 0) {
        setResult(powerPlants[0]);
        setSelectedPowerPlant({
          id: powerPlants[0]._id,
          name: powerPlants[0].displayName,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializePowerPlants();
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 bg-light-main dark:bg-dark-main items-center justify-center">
        <ActivityIndicator size={35} color="white" />
      </View>
    );

  if (!result) return <>{children(Routes.ADD_POWER_PLANT)}</>;

  return <>{children(Routes.DASHBOARD)}</>;
};
export default AppInitializer;
