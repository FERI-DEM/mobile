import PowerDisplay from './PowerDisplay';
import { ScrollView, Text, View } from 'react-native';
import React, { Fragment, useMemo } from 'react';
import MemberProductionListItem from './MemberProductionListItem';
import { useCommunityStore } from '../store/community-store';
import useCommunity from '../hooks/useCommunity';
import useCommunityMembersPowerShare from '../hooks/useCommunityMembersPowerShare';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import {
  calculatePointOnCircle,
  getPieChartPiecePath,
} from '../utils/pie-chart';
import { colors } from '../utils/random-color';
import useUser from '../hooks/useUser';

const CommunityDashboardTab = () => {
  const selectedCommunity = useCommunityStore(
    (state) => state.selectedCommunity
  );
  const { data: user } = useUser();

  const { data: communityData } = useCommunity(selectedCommunity?.id || '', {
    enabled: !!selectedCommunity,
  });
  const { data: membersPowerShare } = useCommunityMembersPowerShare(
    selectedCommunity?.id || '',
    { enabled: !!selectedCommunity }
  );

  const pieChartData = useMemo(() => {
    if (!membersPowerShare) return [];
    return membersPowerShare.map((member, index, array) => {
      if (index === 0)
        return {
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
          user: member.user,
          from: array[index - 1].share * 360,
          to: array[index - 1].share * 360 + member.share * 360,
          textPosition: calculatePointOnCircle(
            70,
            array[index - 1].share * 360 + (member.share * 360) / 2,
            { x: 100, y: 100 }
          ),
        };
    });
  }, [membersPowerShare]);

  if (!communityData) return <Text>Loading...</Text>;

  return (
    <ScrollView className="my-5 mx-4 flex">
      <View className="flex flex-row justify-around pb-5">
        <PowerDisplay power={15} text="Danes" classNameContainer="w-1/3 pr-2" />
        <PowerDisplay power={22} text="Jutri" classNameContainer="w-1/3 px-1" />
        <PowerDisplay
          power={10}
          text="Pojutrišnjem"
          classNameContainer="w-1/3 pl-2"
        />
      </View>
      <Text className="text-white mb-2">Proizvodnja članov</Text>
      {communityData?.members.map((member, index) => {
        return (
          <MemberProductionListItem
            member={member.userName + ' ~ ' + member.powerPlantName}
            power={100}
            active={user?.id === member.userId}
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
            <SvgText
              stroke="white"
              textAnchor="middle"
              transform={`rotate(0, ${data.textPosition.x}, ${data.textPosition.y})`}
              x={data.textPosition.x}
              y={data.textPosition.y}
              fontSize={10}
              fontWeight={1}
            >
              {data.user}
            </SvgText>
          </Fragment>
        ))}
      </Svg>
    </ScrollView>
  );
};
export default CommunityDashboardTab;
