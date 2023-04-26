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
import LineChartText from "./LineChartText";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedGroup = Animated.createAnimatedComponent(G);

interface Point {
    x: number;
    y: number;
}
const padding = 5
const innerOffset = {
    x: 8,
    y: 12
}
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
        {x: 110, y: 20, xLabel: '23.4 10:30'},
        {x: 120, y: 40, xLabel: '23.4 10:45'},
        {x: 130, y: 0, xLabel: '23.12 11:15'},
        {x: 140, y: 20, xLabel: '23.4 11:30'},
        {x: 150, y: 30, xLabel: '23.4 11:45'},
        {x: 160, y: 10, xLabel: '23.12 12:00'},
        {x: 170, y: 0, xLabel: '23.4 12:15'},
        {x: 180, y: 20, xLabel: '23.4 12:30'},
        {x: 190, y: 30, xLabel: '23.4 12:45'},
        {x: 200, y: 10, xLabel: '23.4 13:00'},
        {x: 210, y: 20, xLabel: '23.4 10:30'},
        {x: 220, y: 40, xLabel: '23.4 10:45'},
        {x: 230, y: 0, xLabel: '23.12 11:15'},
        {x: 240, y: 20, xLabel: '23.4 11:30'},
        {x: 250, y: 30, xLabel: '23.4 11:45'},
        {x: 260, y: 10, xLabel: '23.12 12:00'},
        {x: 270, y: 0, xLabel: '23.4 12:15'},
        {x: 280, y: 20, xLabel: '23.4 12:30'},
        {x: 290, y: 30, xLabel: '23.4 12:45'},
        {x: 300, y: 10, xLabel: '23.4 13:00'},
        {x: 310, y: 20, xLabel: '23.4 10:30'},
        {x: 320, y: 40, xLabel: '23.4 10:45'},
        {x: 330, y: 0, xLabel: '23.12 11:15'},
        {x: 340, y: 20, xLabel: '23.4 11:30'},
        {x: 350, y: 30, xLabel: '23.4 11:45'},
        {x: 360, y: 10, xLabel: '23.12 12:00'},
        {x: 370, y: 0, xLabel: '23.4 12:15'},
        {x: 380, y: 20, xLabel: '23.4 12:30'},
        {x: 390, y: 30, xLabel: '23.4 12:45'},
        {x: 400, y: 10, xLabel: '23.4 13:00'},
        {x: 410, y: 20, xLabel: '23.4 10:30'},
        {x: 420, y: 40, xLabel: '23.4 10:45'},
        {x: 430, y: 0, xLabel: '23.12 11:15'},
        {x: 440, y: 20, xLabel: '23.4 11:30'},
        {x: 450, y: 30, xLabel: '23.4 11:45'},
        {x: 460, y: 10, xLabel: '23.12 12:00'},
        {x: 470, y: 0, xLabel: '23.4 12:15'},
        {x: 480, y: 20, xLabel: '23.4 12:30'},
        {x: 490, y: 30, xLabel: '23.4 12:45'},
        {x: 500, y: 10, xLabel: '23.4 13:00'},
    ]

    const max = Math.max(...data.map(({y}) => y))

    const activeScale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const zoomPoint = useSharedValue(30);

    const translateLimits = useSharedValue({min: 0, max: 100})
    const activeTranslate = useSharedValue(0)
    const savedTranslate = useSharedValue(0)

    const sharedData = useSharedValue(data);

    const createYLegend = (max: number) => {
        const labels = Array.from({length: max}, (_, i) => i * 10);
        return labels.map((value, index) => <G key={index} x={-innerOffset.x / 2} y={value}><SvgText transform={'scale(1, -1)'} textAnchor='middle' alignmentBaseline='bottom' key={index} fontSize={2.5} fill="white">{value}</SvgText></G>)
    }

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
        return path
    }, [])


    const pinchGesture = Gesture.Pinch()
        .onStart(e => {
            zoomPoint.value = e.focalX / (graphWidth * savedScale.value) * 75 - activeTranslate.value;
        })
        .onUpdate((e) => {
            activeScale.value = e.scale;
        })
        .onEnd(() => {
            translateLimits.value = {
                min: zoomPoint.value + (translateLimits.value.min - zoomPoint.value) * activeScale.value,
                max: 100
            }
            savedScale.value *= activeScale.value;
            sharedData.value = sharedData.value.map(({x, y, xLabel}) => ({x: zoomPoint.value + (x - zoomPoint.value) * activeScale.value, y, xLabel}))
            activeScale.value = 1
        });

    const panGesture = Gesture.Pan()
        .maxPointers(1)
        .onUpdate((e) => {
            const newTranslate = savedTranslate.value + e.translationX * 0.2
            // //TODO: max limit
            // if(newTranslate + translateLimits.value.min < 0)
            activeTranslate.value = newTranslate
        })
        .onEnd((e) => {
            savedTranslate.value = activeTranslate.value
        })

    const animatedProps = useAnimatedProps(() => ({d: line.value}))
    const areaAnimatedProps = useAnimatedProps(() => ({d: area.value}))
    const animatedTranslateProps = useAnimatedProps(() => ({x: activeTranslate.value}))


    return (<>
            <View className='rounded-lg bg-red-500 flex items-center bg-dark-element mx-auto' style={{width: graphWidth}}>
                <Svg preserveAspectRatio='none' scaleY={-1} viewBox={`${-innerOffset.x} ${-innerOffset.y} ${75 + innerOffset.x} ${60 + innerOffset.y + padding}`} style={{width: graphWidth, height: 300, backgroundColor: '#292A3E'}}>
                    <Rect y={-innerOffset.y} width={graphWidth} height={innerOffset.y} fill='#292A3E'></Rect>
                    <AnimatedGroup animatedProps={animatedTranslateProps}>
                        <G x={1.2 * savedScale.value} y={ -innerOffset.y / 2}>
                            {sharedData.value.map((label, index) => <LineChartText labels={sharedData} index={index} activeScale={activeScale} activeTranslate={activeTranslate} savedScale={savedScale} zoomPoint={zoomPoint} key={index}/> )}
                        </G>
                        <GestureDetector gesture={panGesture}>
                            <GestureDetector gesture={pinchGesture}>
                                <G>
                                    <AnimatedPath strokeWidth={0.5} animatedProps={animatedProps} stroke="rgba(245, 133, 43, 1)" fill="none"/>
                                    <AnimatedPath animatedProps={areaAnimatedProps} stroke="none" fill="rgba(245, 133, 43, 0.3)"/>
                                </G>
                            </GestureDetector>
                        </GestureDetector>
                    </AnimatedGroup>

                    <Rect width={innerOffset.x} x={-innerOffset.x} height={max + innerOffset.y + padding} y={-innerOffset.y} fill='#292A3E'/>
                    {createYLegend(max)}

                    <G x={-innerOffset.x} y={-innerOffset.y - 1}>
                        <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' fill='#1C1B2D'></Path>
                    </G>
                    <G x={75 - innerOffset.x} y={-innerOffset.y - 1}>
                        <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' rotation={90} fill='#1C1B2D'></Path>
                    </G>
                    <G x={-innerOffset.x} y={max + padding + 1}>
                        <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' rotation={-90} fill='#1C1B2D'></Path>
                    </G>
                    <G x={75 - innerOffset.x} y={max + padding + 1}>
                        <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' rotation={180} fill='#1C1B2D'></Path>
                    </G>
                </Svg>
            </View>
        </>

    )
}
export default ChartWithZoom;