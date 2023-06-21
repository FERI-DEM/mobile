import {Text} from 'react-native';
import React from 'react';
import CommunityPieChart from './CommunityPieChart';
import CommunityBarChart from './CommunityBarChart';
import ScrollViewWithViewportTracker from './ScrollViewWithViewportTracker';
import CommunityPowerDisplays from './CommunityPowerDisplays';
import CommunityMembersCurrentProduction from './CommunityMembersCurrentProduction';
import {QueryKey} from '../types/keys.types';
import RefreshControlView from "./RefreshControlView";
import CommunityProductionLineChart from "./CommunityProductionLineChart";
import {useQueryClient} from "@tanstack/react-query";

const CommunityDashboardTab = () => {

  return (
    <RefreshControlView queryKeysForInvalidation={[
      QueryKey.COMMUNITIES_POWER_PREDICTION_BY_DAYS,
      QueryKey.COMMUNITY_MONTHLY_POWER_PRODUCTION,
      QueryKey.COMMUNITY_MEMBERS_POWER_SHARE,
      QueryKey.COMMUNITIES_MEMBERS_CURRENT_PRODUCTION,
        QueryKey.COMMUNITY_POWER_HISTORY,
        QueryKey.COMMUNITY_POWER_PRODUCTION,
    ]}>
      <ScrollViewWithViewportTracker classNames="mb-5 mx-4 flex">
        <>
          <CommunityPowerDisplays />
          <CommunityProductionLineChart/>
          <Text className="text-white mb-2">Trenutna proizvodnja članov</Text>
          <CommunityMembersCurrentProduction />
          <Text className="text-white mb-5 mt-10">
            Proizvodnja za tekoči mesec
          </Text>
          <CommunityBarChart />
          <Text className="text-white mb-5 mt-5">Delež proizvodnje članov</Text>
          <CommunityPieChart />
        </>
      </ScrollViewWithViewportTracker>
    </RefreshControlView>
  );
};
export default CommunityDashboardTab;
