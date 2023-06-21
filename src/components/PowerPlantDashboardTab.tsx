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
import Section from "./Section";

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
              <Section>
                  <PowerPlantPowerDisplays/>
              </Section>
              <Section classNameContainer='mb-0'>
                  <PowerPlantAlert/>
              </Section>
              <Section heading='Graf proizvodnje'>
                  <PowerPlantProductionLineChart />
              </Section>
              <Section classNameContainer='flex flex-row'>
                  <PowerDisplayForNextTimeUnit/>
                  <PowerPlantPowerDifferenceCard/>
              </Section>
              <Section heading='Zgodovinska proizvodnja po mesecih'>
                  <PowerPlantHistoryProductionByMonths />
              </Section>
          </ScrollView>
      </RefreshControlView>
  );
};
export default PowerPlantDashboardTab;
