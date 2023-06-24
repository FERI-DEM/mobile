import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/outline';
import React from 'react';
import {useColorScheme} from "nativewind";
import {colors} from '../constants/colors'

interface LineChartBackToPresentButtonProps {
  savedTranslate: { value: number };
  activeTranslate: { value: number };
  isBackToPresentButtonActive: { value: boolean };
}

const LineChartBackToPresentButton = ({
  savedTranslate,
  activeTranslate,
  isBackToPresentButtonActive,
}: LineChartBackToPresentButtonProps) => {
  const {colorScheme} = useColorScheme()
  const backToPresentButtonStyle = useAnimatedStyle(() => ({
    display:
      (savedTranslate.value > 50 || savedTranslate.value < -50) &&
      isBackToPresentButtonActive.value
        ? 'flex'
        : 'none',
    rotation: savedTranslate.value > 0 ? 180 : 0,
    opacity: 1,
  }));
  const backToPresentButtonPlaceholderStyle = useAnimatedStyle(() => ({
    display:
      (savedTranslate.value > 50 || savedTranslate.value < -50) &&
      !isBackToPresentButtonActive.value
        ? 'flex'
        : 'none',
    rotation: savedTranslate.value > 0 ? 180 : 0,
    opacity: 0.6,
  }));

  const onPressBackToPresentIcon = () => {
    activeTranslate.value = savedTranslate.value;
    savedTranslate.value = 0;
    activeTranslate.value = withTiming(0, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };
  return (
    <>
      <Animated.View
        style={backToPresentButtonStyle}
        className="absolute top-0 right-0 z-50 p-3"
      >
        <TouchableOpacity onPress={onPressBackToPresentIcon}>
          <ChevronDoubleLeftIcon color={colors[colorScheme].text} size={20} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={backToPresentButtonPlaceholderStyle}
        className="absolute top-0 right-0 z-50 p-3"
      >
        <ChevronDoubleLeftIcon color={colors[colorScheme].text} size={20} />
      </Animated.View>
    </>
  );
};
export default LineChartBackToPresentButton;
