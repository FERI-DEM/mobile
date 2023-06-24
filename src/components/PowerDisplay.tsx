import { FC } from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { CountUp } from 'use-count-up';

interface PowerDisplayProps {
  power: number;
  text: string;
  classNameContainer?: string;
  classNameInnerContainer?: string;
  unit?: string;
}
const PowerDisplay: FC<PowerDisplayProps> = ({
  power,
  unit,
  text,
  classNameContainer,
  classNameInnerContainer,
}) => {
  return (
    <View className={twMerge('flex-1 h-36', classNameContainer)}>
      <View
        className={twMerge(
          'py-6 shadow-lg shadow-black rounded-xl grow dark:bg-dark-element flex item-center',
          classNameInnerContainer
        )}
      >
        <Text className="dark:text-white opacity-40 text-center text-xs">
          {text}
        </Text>
        <Text className="text-lg pt-2 dark:text-white  text-center font-semibold">
          <CountUp isCounting end={power} duration={1} />
        </Text>
        <Text className="text-md pt-2 dark:text-white  text-center font-semibold">
          {unit}
        </Text>
      </View>
    </View>
  );
};
export default PowerDisplay;
