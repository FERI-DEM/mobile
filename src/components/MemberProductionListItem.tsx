import React, { FC } from 'react';
import { Pressable, Text } from 'react-native';
import { CountUp } from 'use-count-up';

interface MemberListItemProps {
  member: string;
  power: number;
  active?: boolean;
}

const MemberProductionListItem: FC<MemberListItemProps> = ({
  member,
  power,
  active,
}) => {
  return (
    <Pressable
      className={`flex flex-row justify-between bg-dark-element py-5 px-5 mb-0.5 items-center ${
        active && 'border-l-tint border-2 border-y-0 border-r-0'
      }`}
    >
      <Text className={`text-white ${active && 'text-tint font-bold'}`}>
        {member}
      </Text>
      <Text className={`text-white ${active && 'text-tint font-bold'}`}>
        <CountUp isCounting end={power} duration={1} />
        {` kW`}
      </Text>
    </Pressable>
  );
};

export default MemberProductionListItem;
