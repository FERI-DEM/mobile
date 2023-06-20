import PowerDisplay from './PowerDisplay';
import { ScrollView, View, RefreshControl } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import usePrediction from '../hooks/usePrediction';
import { usePowerPlantStore } from '../store/power-plant-store';
import usePredictionByDays from '../hooks/usePredictionByDays';
import {
  calculatePowerPercentageDifference,
  roundToTwoDecimalPlaces,
} from '../utils/power';
import AlertCard from './AlertCard';
import DateView from './DataView';
import { navigationRef } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import { getTimeString } from '../utils/date';
import { StackActions } from '@react-navigation/native';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import PowerPlantProductionLineChart from './PowerPlantProductionLineChart';
import PowerDifferenceCard from './PowerDifferenceCard';
import { QueryKey } from '../types/keys.types';
import { useQueryClient } from '@tanstack/react-query';

const PowerPlantDashboardTab = () => {
  const { showToast } = useToastStore();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );
  const { data: prediction, isLoading: isLoadingPrediction } = usePrediction(
    selectedPowerPlant?.id || '',
    {
      enabled: !!selectedPowerPlant,
      retry: false,
      onError: () => {
        navigationRef.dispatch(StackActions.replace(Routes.CALIBRATION));
        showToast(
          'Te elektrarne še niste kalibrirali!',
          ToastTypes.INFORMATION
        );
      },
    }
  );
  const { data: predictionByDays, isLoading: isLoadingPredictionByDays } =
    usePredictionByDays(selectedPowerPlant?.id || '', {
      enabled: !!selectedPowerPlant,
      retry: false,
      onError: () => {
        navigationRef.dispatch(StackActions.replace(Routes.CALIBRATION));
        showToast('Te elektrarne še niste kalibrirali', ToastTypes.INFORMATION);
      },
    });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.removeQueries([QueryKey.POWER_PLANT_POWER_PREDICTION]);
    queryClient.removeQueries([QueryKey.POWER_PLANT_POWER_PREDICTION_BY_DAYS]);

    queryClient.invalidateQueries({
      queryKey: [
        QueryKey.POWER_PLANT_POWER_PREDICTION,
        QueryKey.POWER_PLANT_POWER_PREDICTION_BY_DAYS,
      ],
    });

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const data = useMemo(() => {
    if (!prediction || !predictionByDays) return undefined;
    return { prediction, predictionByDays };
  }, [prediction, predictionByDays]);

  return (
    <ScrollView
      className="dark:bg-dark-main flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <DateView<typeof data>
        isLoading={isLoadingPrediction || isLoadingPredictionByDays}
        data={data}
      >
        {(data) => (
          <View className="flex-1">
            <View className="flex flex-row px-4">
              <PowerDisplay
                power={roundToTwoDecimalPlaces(data.predictionByDays[0])}
                text="Danes"
                unit="kWh"
                classNameContainer="w-1/3 pr-2"
              />
              <PowerDisplay
                power={roundToTwoDecimalPlaces(data.predictionByDays[1])}
                text="Jutri"
                unit="kWh"
                classNameContainer="w-1/3 px-1"
              />
              <PowerDisplay
                power={roundToTwoDecimalPlaces(data.predictionByDays[2])}
                text="Pojutrišnjem"
                unit="kWh"
                classNameContainer="w-1/3 pl-2"
              />
            </View>
            <View className="flex-1">
              {calculatePowerPercentageDifference(
                prediction![0].power,
                prediction![1].power
              ) && (
                <AlertCard
                  title={`Pozor padec energije čez ${
                    30 - (new Date().getMinutes() % 15)
                  } minut!`}
                  message={`Čez ${
                    30 - (new Date().getMinutes() % 15)
                  } min bo proizvodnja padla za ${calculatePowerPercentageDifference(
                    prediction![0].power,
                    prediction![1].power
                  )}%.`}
                />
              )}
              <View className="my-5">
                {prediction && <PowerPlantProductionLineChart />}
              </View>

              <View className="mb-4 flex flex-row px-4">
                {prediction && (
                  <PowerDisplay
                    power={roundToTwoDecimalPlaces(prediction[0].power)}
                    text={`Ob ${getTimeString(prediction[0].date)}`}
                    unit="kW"
                    classNameContainer="w-1/3"
                  />
                )}
                {prediction && (
                  <PowerDifferenceCard
                    date={prediction[1].date}
                    power1={prediction![0].power}
                    power2={prediction![1].power}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      </DateView>
    </ScrollView>
  );
};
export default PowerPlantDashboardTab;
