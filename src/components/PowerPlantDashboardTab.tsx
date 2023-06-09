import PowerDisplay from './PowerDisplay';
import {ScrollView, View} from 'react-native';
import React, {useMemo} from 'react';
import usePrediction from '../hooks/usePrediction';
import {usePowerPlantStore} from '../store/power-plant-store';
import LineChart from './LineChart';
import usePredictionByDays from '../hooks/usePredictionByDays';
import {calculatePowerPercentageDifference, roundToTwoDecimalPlaces,} from '../utils/power';
import AlertCard from './AlertCard';
import DateView from './DataView';

const PowerPlantDashboardTab = () => {
  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );
  const {
    data: prediction,
    error,
    isLoading: isLoadingPrediction,
  } = usePrediction(selectedPowerPlant?.id || '', {
    enabled: !!selectedPowerPlant,
  });
  const {
    data: predictionByDays,
    error: error2,
    isLoading: isLoadingPredictionByDays,
  } = usePredictionByDays(selectedPowerPlant?.id || '', {
    enabled: !!selectedPowerPlant,
  });

  const data = useMemo(() => {
    if(!prediction || !predictionByDays) return undefined
    return {prediction, predictionByDays}
  }, [prediction, predictionByDays])
  return (
    <ScrollView className="dark:bg-dark-main flex-1" contentContainerStyle={{flexGrow: 1}}>
        <DateView<typeof data> isLoading={isLoadingPrediction || isLoadingPredictionByDays} data={data}>
          {(data) => (
              <View className='flex-1'>
                <View className='flex flex-1 flex-row px-4'>
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
                <View className='flex-1'>
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

                  <View className="mx-4 mb-4">
                    {prediction && (
                        <PowerDisplay
                            power={roundToTwoDecimalPlaces(prediction[0].power)}
                            text={`Čez ${15 - (new Date().getMinutes() % 15)} min`}
                            classNameContainer="w-1/3"
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
