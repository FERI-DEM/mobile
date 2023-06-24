import {TouchableOpacity} from "react-native";
import {useColorScheme} from "nativewind";
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import {colors} from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
const ColorSchemeToggle = () => {
    const { toggleColorScheme, colorScheme } = useColorScheme();
    const progress = useSharedValue(0);

    const onPress = async () => {
        toggleColorScheme();
    }

    useEffect(() => {
        const targetValue = colorScheme === 'dark' ? 1 : 0;
        progress.value = withTiming(targetValue, { duration: 200 })
        AsyncStorage.setItem('color-scheme', colorScheme);
    }, [colorScheme])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0, 1],
                [colors.light.element, colors.common.tint]
            ),
        };
    });
    const innerViewAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: interpolate(progress.value, [0, 1], [0, 40])}
        ]
    }))

    return <TouchableOpacity className='w-20 h-10 bg-transparent  rounded-full' onPress={onPress}>
        <Animated.View className='w-full h-full flex justify-center px-1.5  rounded-full shadow-sm shadow-black' style={animatedStyle}>
            <Animated.View style={innerViewAnimatedStyle} className='w-7 h-7 bg-light-main rounded-full'></Animated.View>
        </Animated.View>
    </TouchableOpacity>
}
export default ColorSchemeToggle;