import MemberProductionListItem from './MemberProductionListItem';
import { roundToTwoDecimalPlaces } from '../utils/power';
import React from 'react';
import DataView from './DataView';
import { ScrollView, Text, View } from 'react-native';
import Skeleton from './Skeleton';
import { usePowerPlantStore } from '../store/power-plant-store';
import usePowerPlantProductionHistoryByMonth from '../hooks/usePowerPlantProductionHistoryByMonth';
import { getMonthName } from '../utils/date';

const PowerPlantHistoryProductionByMonths = () => {
  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );
  const {
    data: powerPlantHistoryProductionByMonth,
    isLoading: isLoadingPowerPlantHistoryProductionByMonth,
  } = usePowerPlantProductionHistoryByMonth(selectedPowerPlant?.id || '', {
    enabled: !!selectedPowerPlant,
    retry: false,
  });
  if (powerPlantHistoryProductionByMonth?.length === 0)
    return (
      <Text className="text-white opacity-40 mb-4">
        Trenutno ni podatkov o zgodovini proizvodnje elektrarne.
      </Text>
    );
  return (
    <DataView
      isLoading={isLoadingPowerPlantHistoryProductionByMonth}
      data={powerPlantHistoryProductionByMonth}
      loadingComponent={
        <Skeleton
          classNameContainer={'shadow-lg shadow-black dark:bg-dark-element'}
        >
          <View className="border-l-2 border-l-dark-skeleton-content h-16 w-full bg flex flex-row justify-between px-5 items-center border-b-2 border-b-dark-main">
            <View className="bg-dark-skeleton-content w-32 h-5"></View>
            <View className="bg-dark-skeleton-content w-14 h-5"></View>
          </View>
          <View className="border-l-2 border-dark-skeleton-content h-16 w-full flex flex-row justify-between px-5 items-center border-b-2 border-b-dark-main">
            <View className="bg-dark-skeleton-content w-32 h-5"></View>
            <View className="bg-dark-skeleton-content w-14 h-5"></View>
          </View>
          <View className="border-l-2 border-dark-skeleton-content h-16 w-full flex flex-row justify-between px-5 items-center">
            <View className="bg-dark-skeleton-content w-32 h-5"></View>
            <View className="bg-dark-skeleton-content w-14 h-5"></View>
          </View>
        </Skeleton>
      }
    >
      {(powerPlantHistoryProductionByMonth) => (
        <ScrollView className="max-h-56" nestedScrollEnabled>
          {powerPlantHistoryProductionByMonth
            .slice(0)
            .reverse()
            .map((powerPlantProduction, index) => (
              <MemberProductionListItem
                member={
                  getMonthName(powerPlantProduction.month) +
                  ' (' +
                  powerPlantProduction.year +
                  ')'
                }
                power={roundToTwoDecimalPlaces(powerPlantProduction.production)}
                key={index}
              />
            ))}
        </ScrollView>
      )}
    </DataView>
  );
};
export default PowerPlantHistoryProductionByMonths;
