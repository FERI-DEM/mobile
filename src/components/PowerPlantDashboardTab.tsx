import PowerDisplay from './PowerDisplay';
import { ScrollView, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import usePrediction from '../hooks/usePrediction';
import { usePowerPlantStore } from '../store/power-plant-store';
import usePredictionByDays from '../hooks/usePredictionByDays';
import {
  calculatePowerDifference,
  calculatePowerPercentageDifference,
  roundToTwoDecimalPlaces,
} from '../utils/power';
import AlertCard from './AlertCard';
import DateView from './DataView';
import { navigationRef } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from 'react-native-heroicons/outline';
import { CountUp } from 'use-count-up';
import { getTimeString } from '../utils/date';
import { StackActions } from '@react-navigation/native';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import PowerPlantProductionLineChart from './PowerPlantProductionLineChart';

const PowerPlantDashboardTab = () => {
  const { showToast } = useToastStore();
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
        showToast('Te elektrarne še niste kalibrirali!', ToastTypes.ERROR);
      },
    }
  );
  const { data: predictionByDays, isLoading: isLoadingPredictionByDays } =
    usePredictionByDays(selectedPowerPlant?.id || '', {
      enabled: !!selectedPowerPlant,
      retry: false,
      onError: () => {
        navigationRef.dispatch(StackActions.replace(Routes.CALIBRATION));
        showToast('Te elektrarne še niste kalibrirali', ToastTypes.ERROR);
      },
    });

  const data = useMemo(() => {
    if (!prediction || !predictionByDays) return undefined;
    return { prediction, predictionByDays };
  }, [prediction, predictionByDays]);

  return (
    <ScrollView
      className="dark:bg-dark-main flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
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
                  <View className="shadow-lg shadow-black rounded-xl dark:bg-dark-element dark:text-white py-6 px-6 flex flex-row items-center justify-around grow ml-4">
                    {calculatePowerDifference(
                      prediction![0].power,
                      prediction![1].power
                    ) >= 0 ? (
                      <ArrowUpCircleIcon color="green" size={35} />
                    ) : (
                      <ArrowDownCircleIcon color="red" size={35} />
                    )}
                    <View className="flex flex-2 ml-5">
                      <Text className="text-white opacity-40 text-center text-xs">
                        {`Ob ${getTimeString(prediction[1].date)}`}
                      </Text>
                      <Text className="text-lg pt-2 text-white  text-center font-semibold">
                        {calculatePowerDifference(
                          prediction![0].power,
                          prediction![1].power
                        ) >= 0
                          ? '+'
                          : '-'}
                        <CountUp
                          isCounting
                          end={Math.abs(
                            calculatePowerDifference(
                              prediction![0].power,
                              prediction![1].power
                            )
                          )}
                          duration={1}
                        />
                        kW
                      </Text>
                    </View>
                  </View>
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
