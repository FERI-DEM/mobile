import PowerDisplay from './PowerDisplay';
import { ScrollView, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import usePrediction from '../hooks/usePrediction';
import { usePowerPlantStore } from '../store/power-plant-store';
import LineChart from './LineChart';
import usePredictionByDays from '../hooks/usePredictionByDays';
import {
  calculatePowerDifference,
  calculatePowerPercentageDifference,
  roundToTwoDecimalPlaces,
} from '../utils/power';
import AlertCard from './AlertCard';
import DateView from './DataView';
import { navigate } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from 'react-native-heroicons/outline';
import { CountUp } from 'use-count-up';

const PowerPlantDashboardTab = () => {
  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );
  const { data: prediction, isLoading: isLoadingPrediction } = usePrediction(
    selectedPowerPlant?.id || '',
    {
      enabled: !!selectedPowerPlant,
      retry: false,
      onError: () => {
        navigate(Routes.CALIBRATION);
      },
    }
  );
  const { data: predictionByDays, isLoading: isLoadingPredictionByDays } =
    usePredictionByDays(selectedPowerPlant?.id || '', {
      enabled: !!selectedPowerPlant,
      retry: false,
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
                classNameContainer="w-1/3 pr-2"
              />
              <PowerDisplay
                power={roundToTwoDecimalPlaces(data.predictionByDays[1])}
                text="Jutri"
                classNameContainer="w-1/3 px-1"
              />
              <PowerDisplay
                power={roundToTwoDecimalPlaces(data.predictionByDays[2])}
                text="Pojutrišnjem"
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
                {prediction && <LineChart data={prediction} />}
              </View>

              <View className="mb-4 flex flex-row px-4">
                {prediction && (
                  <PowerDisplay
                    power={roundToTwoDecimalPlaces(prediction[0].power)}
                    text={`Čez ${15 - (new Date().getMinutes() % 15)} min`}
                    classNameContainer="w-1/3"
                  />
                )}
                {prediction && (
                  <View className="shadow-lg shadow-black rounded-xl dark:bg-dark-element dark:text-white py-6 px-6 flex flex-row items-center justify-around mx-4">
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
                        {`Čez ${30 - (new Date().getMinutes() % 15)} minut`}
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
                          end={calculatePowerDifference(
                            prediction![0].power,
                            prediction![1].power
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
