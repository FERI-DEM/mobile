import { Text, RefreshControl } from 'react-native';
import React, { useCallback, useState } from 'react';
import CommunityPieChart from './CommunityPieChart';
import CommunityBarChart from './CommunityBarChart';
import ScrollViewWithViewportTracker from './ScrollViewWithViewportTracker';
import CommunityPowerDisplays from './CommunityPowerDisplays';
import CommunityMembersCurrentProduction from './CommunityMembersCurrentProduction';
import { QueryKey } from '../types/keys.types';
import { useQueryClient } from '@tanstack/react-query';

const CommunityDashboardTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.removeQueries([QueryKey.COMMUNITIES_POWER_PREDICTION_BY_DAYS]);
    queryClient.removeQueries([QueryKey.COMMUNITY_MONTHLY_POWER_PRODUCTION]);
    queryClient.removeQueries([QueryKey.COMMUNITY_MEMBERS_POWER_SHARE]);
    queryClient.removeQueries([
      QueryKey.COMMUNITIES_MEMBERS_CURRENT_PRODUCTION,
    ]);

    queryClient.invalidateQueries({
      queryKey: [
        QueryKey.COMMUNITIES_POWER_PREDICTION_BY_DAYS,
        QueryKey.COMMUNITY_MONTHLY_POWER_PRODUCTION,
        QueryKey.COMMUNITY_MEMBERS_POWER_SHARE,
        QueryKey.COMMUNITIES_MEMBERS_CURRENT_PRODUCTION,
      ],
    });

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollViewWithViewportTracker
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#FFFFFF']}
          progressBackgroundColor="#236BFE"
          tintColor="#236BFE"
        />
      }
      classNames="mb-5 mx-4 flex"
    >
      <>
        <CommunityPowerDisplays />
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
  );
};
export default CommunityDashboardTab;
