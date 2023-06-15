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
  console.log(membersCurrentProduction);
  const pieChartData = useMemo(() => {
    if (!membersPowerShare) return [];
    return membersPowerShare.map((member, index, array) => {
      if (index === 0)
        return {
          share: (member.share * 100).toFixed(0),
          user: member.user,
          from: 0,
          to: member.share * 360,
          textPosition: calculatePointOnCircle(70, (member.share * 360) / 2, {
            x: 100,
            y: 100,
          }),
        };
      else
        return {
          share: (member.share * 100).toFixed(0),
          user: member.user,
          from: array[index - 1].share * 360,
          to: array[index - 1].share * 360 + member.share * 360,
          textPosition: calculatePointOnCircle(
            70,
            (array[index - 1].share * 360 +
              (array[index - 1].share * 360 + member.share * 360)) /
              2,
            { x: 100, y: 100 }
          ),
        };
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
          <Fragment key={index}>
            <Path
              key={index}
              d={getPieChartPiecePath(100, data.from, data.to)}
              fill={colors[index]}
              stroke={'#1C1B2D'}
              strokeWidth={2}
            />
            <G
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
          </Fragment>
        ))}
      </Svg>
    </ScrollView>
  );
};
export default CommunityDashboardTab;
