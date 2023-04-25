import {Text, View, ScrollView, useWindowDimensions} from "react-native";
import React, {useRef, useState} from "react";
import PowerPlantDashboardTab from "../components/PowerPlantDashboardTab";
import PowerPlantSettingsTab from "../components/PowerPlantSettingsTab";
import Svg, {Path, G, Text as SvgText, Circle, Pattern, Rect, Defs, ClipPath} from "react-native-svg";
import LineChartSvg from "../components/LineChartSvg";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedProps, useAnimatedReaction,
    useAnimatedStyle, useDerivedValue,
    useSharedValue
} from "react-native-reanimated";
import {Gesture, GestureDetector, PanGestureHandler} from "react-native-gesture-handler";
import Button from "./Button";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Point {
    x: number;
    y: number;
}

const points = [30, 50 ,10]

const ChartWithZoom = () => {
    const window = useWindowDimensions()
    const graphWidth = window.width

    const data = [
        {x: 0, y: 20, xLabel: '23.4 10:30'},
        {x: 10, y: 40, xLabel: '23.4 10:45'},
        {x: 20, y: 50, xLabel: '23.4 11:00'},
        {x: 30, y: 0, xLabel: '23.12 11:15'},
        {x: 40, y: 20, xLabel: '23.4 11:30'},
        {x: 50, y: 30, xLabel: '23.4 11:45'},
        {x: 60, y: 10, xLabel: '23.12 12:00'},
        {x: 70, y: 0, xLabel: '23.4 12:15'},
        {x: 80, y: 20, xLabel: '23.4 12:30'},
        {x: 90, y: 30, xLabel: '23.4 12:45'},
        {x: 100, y: 10, xLabel: '23.4 13:00'},
    ]

    const activeScale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const zoomPoint = useSharedValue(30);
    const sharedData = useSharedValue(data);

    const line = useDerivedValue(() => {
        let path = ''
        const unitLength = sharedData.value[1].x - sharedData.value[0].x
        sharedData.value.forEach(({x, y}, index) => {
            x=zoomPoint.value + (x - zoomPoint.value) * activeScale.value
            if(index === 0)
                path = `M ${x},${y} `
            else
                path += `C ${zoomPoint.value + (sharedData.value[index - 1].x - zoomPoint.value) * activeScale.value + 0.5 * unitLength * activeScale.value},${sharedData.value[index - 1].y} ${x - 0.5 * unitLength * activeScale.value},${y} ${x},${y} `
        })
        return path
    }, [])

    const area = useDerivedValue(() => {
        const unitLength = sharedData.value[1].x - sharedData.value[0].x
        let path = `M ${zoomPoint.value + (sharedData.value[0].x - zoomPoint.value) * activeScale.value},0 `
        sharedData.value.forEach(({x, y}, index) => {
            x=zoomPoint.value + (x - zoomPoint.value) * activeScale.value
            if(index === 0)
                path += `L ${x},${y} `
            else
                path += `C ${zoomPoint.value + (sharedData.value[index - 1].x - zoomPoint.value) * activeScale.value + 0.5 * unitLength * activeScale.value},${sharedData.value[index - 1].y} ${x - 0.5 * unitLength * activeScale.value},${y} ${x},${y} `
        })
        path += `L ${zoomPoint.value + (sharedData.value[sharedData.value.length - 1].x - zoomPoint.value) * activeScale.value},0`
        console.log(path)
        return path
    })


    const pinchGesture = Gesture.Pinch()
        .onStart(e => {
            zoomPoint.value = e.focalX / (graphWidth * savedScale.value) * 75;
        })
        .onUpdate((e) => {
            activeScale.value = e.scale;
        })
        .onEnd(() => {
            savedScale.value *= activeScale.value;
            sharedData.value = sharedData.value.map(({x, y, xLabel}) => ({x: zoomPoint.value + (x - zoomPoint.value) * activeScale.value, y, xLabel}))
            activeScale.value = 1
        });

    const animatedProps = useAnimatedProps(() => ({d: line.value}))
    const areaAnimatedProps = useAnimatedProps(() => ({d: area.value}))


    return (<>
            <View className='rounded-lg bg-red-500 flex items-center bg-dark-element mx-auto' style={{width: graphWidth}}>
                <Svg scaleY={-1} viewBox={`0 0 75 60`} style={{width: graphWidth, height: 300, backgroundColor: '#292A3E'}}>
                    <GestureDetector gesture={pinchGesture}>
                        <G>
                            <AnimatedPath strokeWidth={0.5} animatedProps={animatedProps} stroke="rgba(245, 133, 43, 1)" fill="none"/>
                            <AnimatedPath animatedProps={areaAnimatedProps} stroke="none" fill="rgba(245, 133, 43, 0.3)"/>

                        </G>

                    </GestureDetector>



                </Svg>

            </View>
        </>

    )
}
export default ChartWithZoom;