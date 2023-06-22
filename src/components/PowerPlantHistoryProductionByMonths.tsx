import MemberProductionListItem from './MemberProductionListItem';
import { roundToTwoDecimalPlaces } from '../utils/power';
import React from 'react';
import DataView from './DataView';
import { ScrollView, Text, View } from 'react-native';
import Skeleton from './Skeleton';
import { usePowerPlantStore } from '../store/power-plant-store';
import usePowerPlantProductionHistoryByMonth from '../hooks/usePowerPlantProductionHistoryByMonth';
import { getMonthName } from '../utils/date';
import ProductionListSkeleton from "./ProductionListSkeleton";

const PowerPlantHistoryProductionByMonths = () => {
  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );
  const {
    data: powerPlantHistoryProductionByMonth,
    isFetching: isFetchingPowerPlantHistoryProductionByMonth,
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
      isLoading={isFetchingPowerPlantHistoryProductionByMonth}
      data={powerPlantHistoryProductionByMonth}
      loadingComponent={<ProductionListSkeleton/>}
    >
      {(powerPlantHistoryProductionByMonth) => (
        <ScrollView nestedScrollEnabled>
          <View className="max-h-56 flex-1">
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
          </View>
        </ScrollView>
      )}
    </DataView>
  );
};
export default PowerPlantHistoryProductionByMonths;
