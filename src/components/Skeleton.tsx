import { StyleProp, View, ViewStyle, LayoutChangeEvent} from "react-native";
import {twMerge} from "tailwind-merge";
import {ReactNode} from "react";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {LinearGradient} from "expo-linear-gradient";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

interface SkeletonProps {
    classNameContainer: string
    style?: StyleProp<ViewStyle>
    children?: ReactNode
}
const Skeleton = ({classNameContainer, style, children}: SkeletonProps) => {
    const translateX = useSharedValue(-0)
    const translateY = useSharedValue(-0)
    const duration = 2000

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}, {translateY: translateY.value}],
        position: 'absolute',
        width: '200%',
        height: '200%',
        zIndex: 100
    }))
    const onLayout = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width
        const height = event.nativeEvent.layout.height
        translateX.value = -width * 2
        translateY.value = -height * 2
        translateX.value = withRepeat(withTiming(width * 2, {
            duration: duration,
            easing: Easing.inOut(Easing.ease)
        }),-1, false);
        translateY.value = withRepeat(withTiming(height * 2, {
            duration: duration,
            easing: Easing.inOut(Easing.ease)
        }),-1, false);
    }

    return <View onLayout={onLayout} className={twMerge('bg-dark-element flex-1 grow relative overflow-hidden', classNameContainer)} style={style}>
        <AnimatedLG
            colors={["rgba(41,42,62,0)", "rgba(48,49,73,0.65)", "rgba(48,49,73,0.64)", "rgba(41,42,62,0)"]}
            start={{ x: 0.35, y: 0.35 }}
            end={{ x: 0.65, y: 0.65 }}
            style={animatedStyle}
        />
        {children}
    </View>
};
export default Skeleton;