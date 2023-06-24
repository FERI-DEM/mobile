import React, {FC, ReactNode, useRef} from 'react';
import {ActivityIndicator, LayoutChangeEvent, Text, TouchableOpacity} from 'react-native';
import { twMerge } from 'tailwind-merge';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ButtonProps {
  children?: ReactNode;
  text: string | ReactNode;
  onPress: () => void;
  classname?: string;
  disabled?: boolean;
  classNameText?: string;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  text,
  onPress,
  classname,
  classNameText,
  loading = false,
}) => {
  const scale = useSharedValue(1);
  const size = useRef<{width: number, height: number} | null>(null);

  const onPressIn = () => {
    scale.value = withTiming(0.9, { duration: 100 });
  };

  const onPressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
        width: size.current?.width,
        height: size.current?.height,
    };
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    size.current = { width, height };
  }

  return (
    <Animated.View
      className={twMerge(
        'bg-tint rounded-md self-start flex items-center justify-center',
        classname
      )}
      onLayout={onLayout}
      style={animatedStyle}
    >
      {loading ? (
        <ActivityIndicator size={28} className="py-1.5 px-6" color="white" />
      ) : (
        <TouchableOpacity
          onPressOut={onPressOut}
          onPressIn={onPressIn}
          activeOpacity={0.7}
          onPress={onPress}
          className="py-2.5 px-4"
        >
          <Text className={twMerge('dark:text-white font-bold', classNameText)}>
            {text}
          </Text>
          {children}
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Button;
