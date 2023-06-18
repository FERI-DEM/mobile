import PowerDisplay from './PowerDisplay';
import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import MemberProductionListItem from './MemberProductionListItem';
import { useCommunityStore } from '../store/community-store';
import useUser from '../hooks/useUser';
import useCommunitiesPredictionByDays from '../hooks/useCommunitiesPredictionByDays';
import { roundToTwoDecimalPlaces } from '../utils/power';
import useCommunityMembersCurrentProduction from '../hooks/useCommunityMembersCurrentProduction';
import CommunityPieChart from "./CommunityPieChart";
import CommunityBarChart from "./CommunityBarChart";
import ScrollViewWithViewportTracker from "./ScrollViewWithViewportTracker";

const CommunityDashboardTab = () => {
  const selectedCommunity = useCommunityStore(
    (state) => state.selectedCommunity
  );
  const { data: user } = useUser();

  const { data: predictionByDays, isLoading: isLoadingPredictionByDays } =
    useCommunitiesPredictionByDays(selectedCommunity?.id || '', {
      enabled: !!selectedCommunity,
      retry: false,
    });

  const {
    data: membersCurrentProduction,
    isLoading: isLoadingMembersCurrentProduction,
  } = useCommunityMembersCurrentProduction(selectedCommunity?.id || '', {
    enabled: !!selectedCommunity,
    retry: false,
  });


  if (!predictionByDays || !membersCurrentProduction)
    return <Text>Loading...</Text>;

  return (
    <ScrollViewWithViewportTracker classNames="mb-5 mx-4 flex">
        <>
      <View className="flex flex-row justify-around pb-5">
        <PowerDisplay
          power={roundToTwoDecimalPlaces(predictionByDays[0])}
          text="Danes"
          classNameContainer="w-1/3 pr-2"
          unit="kWh"
        />
        <PowerDisplay
          power={roundToTwoDecimalPlaces(predictionByDays[1])}
          text="Jutri"
          classNameContainer="w-1/3 px-1"
          unit="kWh"
        />
        <PowerDisplay
          power={roundToTwoDecimalPlaces(predictionByDays[2])}
          text="Pojutrišnjem"
          classNameContainer="w-1/3 pl-2"
          unit="kWh"
        />
      </View>
            <Text className="text-white mb-5 mt-10">Proizvodnja za tekoči mesec</Text>
            <CommunityBarChart/>
      <Text className="text-white mb-2">Trenutna proizvodnja članov</Text>
      {membersCurrentProduction?.powerPlants.map((powerPlant, index) => {
        return (
          <MemberProductionListItem
            member={powerPlant.username + ' ~ ' + powerPlant.displayName}
            power={roundToTwoDecimalPlaces(powerPlant.production.power)}
            active={user?.id === powerPlant.userId}
            key={index}
          />
        );
      })}

      <Text className="text-white mb-5 mt-5">Delež proizvodnje članov</Text>
      <CommunityPieChart/></>
    </ScrollViewWithViewportTracker>
  );
};
export default CommunityDashboardTab;
