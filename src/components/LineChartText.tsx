import Animated, {useAnimatedProps, useDerivedValue} from "react-native-reanimated";
import React from "react";
import {G, Text} from "react-native-svg";

const AnimatedGroup = Animated.createAnimatedComponent(G);
interface LineChartTextProps {
    labels: {value: {x: number, y: number, xLabel: string}[]}
    index: number
    activeScale: {value: number}
    savedScale: {value: number}
    zoomPoint: {value: number}
    activeTranslate: {value: number}
}
const LineChartText = ({labels, activeScale, activeTranslate, index, zoomPoint}: LineChartTextProps) => {
    const label = useDerivedValue(() => {
        return {
            x: zoomPoint.value + (labels.value[index].x - zoomPoint.value) * activeScale.value,
            y: 3,
        }
    }, [])
    const animatedProps = useAnimatedProps(() => ({x: label.value.x, y: label.value.y}))

    return <AnimatedGroup animatedProps={animatedProps}><G rotation={-35}><Text alignmentBaseline='bottom' vectorEffect='non-scaling-stroke' transform={`scale(1, -1)`} fontSize={2.5} fill="white">{labels.value[index].xLabel}</Text></G></AnimatedGroup>
}
export default LineChartText