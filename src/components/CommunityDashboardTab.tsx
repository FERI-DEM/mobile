import { Text } from 'react-native';
import React from 'react';
import CommunityPieChart from "./CommunityPieChart";
import CommunityBarChart from "./CommunityBarChart";
import ScrollViewWithViewportTracker from "./ScrollViewWithViewportTracker";
import CommunityPowerDisplays from "./CommunityPowerDisplays";
import CommunityMembersCurrentProduction from "./CommunityMembersCurrentProduction";

const CommunityDashboardTab = () => {

  return (
    <ScrollViewWithViewportTracker classNames="mb-5 mx-4 flex">
        <>
      <CommunityPowerDisplays/>
      <Text className="text-white mb-2">Trenutna proizvodnja članov</Text>
    <CommunityMembersCurrentProduction/>
    <Text className="text-white mb-5 mt-10">Proizvodnja za tekoči mesec</Text>
    <CommunityBarChart/>
      <Text className="text-white mb-5 mt-5">Delež proizvodnje članov</Text>
      <CommunityPieChart/></>
    </ScrollViewWithViewportTracker>
  );
};
export default CommunityDashboardTab;
