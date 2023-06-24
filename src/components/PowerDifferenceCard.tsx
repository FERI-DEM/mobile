import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { CountUp } from 'use-count-up';
import { calculatePowerDifference } from '../utils/power';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from 'react-native-heroicons/outline';
import { getTimeString } from '../utils/date';

interface PowerDifferenceCardProps {
  power1: number;
  power2: number;
  date: string;
}
const PowerDifferenceCard: FC<PowerDifferenceCardProps> = ({
  power1,
  power2,
  date,
}) => {
  return (
    <View className="shadow-lg shadow-black rounded-xl dark:bg-dark-element dark:text-white py-6 flex flex-row items-center justify-around grow ml-4">
      {calculatePowerDifference(power1, power2) >= 0 ? (
        <ArrowUpCircleIcon color="green" size={45} />
      ) : (
        <ArrowDownCircleIcon color="red" size={45} />
      )}
      <View className="flex flex-2">
        <Text className="dark:text-white opacity-40 text-center text-xs">
          {`Ob ${getTimeString(date)}`}
        </Text>
        <Text className="text-lg pt-2 dark:text-white  text-center font-semibold">
          {calculatePowerDifference(power1, power2) >= 0 ? '+' : '-'}
          <CountUp
            isCounting
            end={Math.abs(calculatePowerDifference(power1, power2))}
            duration={1}
          />
          {` kW`}
        </Text>
      </View>
    </View>
  );
};
export default PowerDifferenceCard;
