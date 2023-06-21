import { ScrollView, View, Text } from 'react-native';
import React from 'react';
import PowerPlantProductionLineChart from './PowerPlantProductionLineChart';
import { QueryKey } from '../types/keys.types';
import PowerPlantHistoryProductionByMonths from './PowerPlantHistoryProductionByMonths';
import RefreshControlView from "./RefreshControlView";
import PowerPlantAlert from "./PowerPlantAlert";
import PowerDisplayForNextTimeUnit from "./PowerDisplayForNextTimeUnit";
import PowerPlantPowerDifferenceCard from "./PowerPlantPowerDifferenceCard";
import PowerPlantPowerDisplays from "./PowerPlantPowerDisplays";

const PowerPlantDashboardTab = () => {
  return (
      <RefreshControlView queryKeysForInvalidation={
          [QueryKey.POWER_PLANT_POWER_PREDICTION,
          QueryKey.POWER_PLANT_POWER_PREDICTION_BY_DAYS,
              QueryKey.POWER_PLANT_POWER_PREDICTION_BY_MONTHS,
              QueryKey.POWER_PLANT_POWER_HISTORY]
      }>
          <ScrollView
              className="dark:bg-dark-main flex-1 mb-5 mx-4"
              contentContainerStyle={{ flexGrow: 1 }}
          >
              <View className='pb-5'>
                  <PowerPlantPowerDisplays/>
                  <PowerPlantAlert/>
                  <PowerPlantProductionLineChart />


                  <View className="my-4 flex flex-row">
                      <PowerDisplayForNextTimeUnit/>
                      <PowerPlantPowerDifferenceCard/>
                  </View>

                  <Text className="text-white mb-4">
                      Zgodovinska proizvodnja po mesecih
                  </Text>
                  <PowerPlantHistoryProductionByMonths />
              </View>
          </ScrollView>
      </RefreshControlView>
  );
};
export default PowerPlantDashboardTab;
