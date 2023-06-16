import PowerDisplay from './PowerDisplay';
import { ScrollView, Text, View } from 'react-native';
import React, { Fragment, useMemo } from 'react';
import MemberProductionListItem from './MemberProductionListItem';
import { useCommunityStore } from '../store/community-store';
import useCommunityMembersPowerShare from '../hooks/useCommunityMembersPowerShare';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import {
  calculatePointOnCircle,
  getPieChartPiecePath,
} from '../utils/pie-chart';
import { colors } from '../utils/random-color';
import useUser from '../hooks/useUser';
import useCommunitiesPredictionByDays from '../hooks/useCommunitiesPredictionByDays';
import { roundToTwoDecimalPlaces } from '../utils/power';
import useCommunityMembersCurrentProduction from '../hooks/useCommunityMembersCurrentProduction';

const CommunityDashboardTab = () => {
  const selectedCommunity = useCommunityStore(
    (state) => state.selectedCommunity
  );
  const { data: user } = useUser();

  const { data: membersPowerShare } = useCommunityMembersPowerShare(
    selectedCommunity?.id || '',
    { enabled: !!selectedCommunity }
  );

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

  const pieChartData = useMemo(() => {
    if (!membersPowerShare) return [];
    return membersPowerShare.map((member, index, array) => {
      const startAngle = array.filter((_, i) => i < index).reduce((acc, curr) => acc += curr.share * 360, 0)
      const endAngle = startAngle + member.share * 360

      return {
        ...member,
        share: (member.share * 100).toFixed(0),
        from: startAngle,
        to: endAngle,
        textPosition: calculatePointOnCircle(70, (startAngle + endAngle) / 2, {
          x: 100,
          y: 100,
        }),
      }
    });
  }, [membersPowerShare]);

  if (!predictionByDays || !membersCurrentProduction)
    return <Text>Loading...</Text>;

  return (
    <ScrollView className="my-5 mx-4 flex">
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
      <Svg
        viewBox="0 0 200 200"
        className="w-full"
        style={{ height: 300, backgroundColor: '#1C1B2D' }}
      >
        {pieChartData?.map((data, index) => (
            <Path
              key={index}
              d={getPieChartPiecePath(100, data.from, data.to)}
              fill={colors[index]}
              stroke={'#1C1B2D'}
              strokeWidth={2}
            />
        ))}
        {pieChartData?.map((data, index) => (
            <G
                key={index}
                transform={`rotate(0, ${data.textPosition.x}, ${data.textPosition.y})`}
                x={data.textPosition.x}
                y={data.textPosition.y}
            >
              <SvgText
                  stroke="white"
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={1}
                  y={-6}
              >
                {data.user}
              </SvgText>
              <SvgText
                  stroke="white"
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={1}
                  y={6}
              >
                {data.share + '%'}
              </SvgText>
            </G>
        ))}
      </Svg>
    </ScrollView>
  );
};
export default CommunityDashboardTab;
