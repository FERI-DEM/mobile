import React, { FC } from 'react';
import { View } from 'react-native';
import CommunitySettingsTab from '../components/CommunitySettingsTab';
import CommunityDashboardTab from '../components/CommunityDashboardTab';
import {
  CommunityTab,
  useCommunityTabsStore,
} from '../store/community-tabs-store';
import Tabs from '../components/Tabs';
import { QueryBoundaries } from '../components/QueryBoundaries';
import { useCommunityStore } from '../store/community-store';
import CommunityMembersTab from '../components/CommunityMembersTab';

const CommunityScreen: FC = () => {
  const { activeTab, setActiveTab } = useCommunityTabsStore((state) => state);
  const selectedCommunity = useCommunityStore(
    (state) => state.selectedCommunity
  );

  return (
    <View className="dark:bg-dark-main flex-1 pt-2">
      <QueryBoundaries isLoading={!selectedCommunity}>
        <Tabs
          activeTab={activeTab}
          tabs={Object.values(CommunityTab)}
          onClickTab={setActiveTab}
        />
        {activeTab === CommunityTab.DASHBOARD && <CommunityDashboardTab />}
        {activeTab === CommunityTab.MEMBERS && <CommunityMembersTab />}
        {activeTab === CommunityTab.SETTINGS && <CommunitySettingsTab />}
      </QueryBoundaries>
    </View>
  );
};

export default CommunityScreen;
