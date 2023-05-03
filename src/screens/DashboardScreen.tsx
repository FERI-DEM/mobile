import {Text, View, ScrollView, useWindowDimensions} from "react-native";
import React, {useState} from "react";
import PowerPlantDashboardTab from "../components/PowerPlantDashboardTab";
import PowerPlantSettingsTab from "../components/PowerPlantSettingsTab";
import Svg, {Path, G, Text as SvgText, Circle, Pattern, Rect, Defs, ClipPath} from "react-native-svg";
import LineChartSvg from "../components/LineChartSvg";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated";
import {PanGestureHandler} from "react-native-gesture-handler";
import ChartWithZoom from "../components/ChartWithZoom";
import LineChartNoLibrary from "../components/LineChartNoLibrary";

const AnimatedGroup = Animated.createAnimatedComponent(G);

interface Point {
    x: number;
    y: number;
}

export enum PowerPlantsTabs {
    DASHBOARD = 'Nadzorna plošča',
    SETTINGS = 'Nastavitve',
}
const padding = 5
const innerOffset = {
    x: 8,
    y: 12
}
const DashboardScreen = () => {
    const translateX = useSharedValue(0);
    const window = useWindowDimensions()
    const graphWidth = window.width - 30
    const [activeTab, setActiveTab] = useState<PowerPlantsTabs>(PowerPlantsTabs.DASHBOARD);
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
    const max = Math.max(...data.map(({y}) => y))
    const transformedData = data.map(({x, y}) => ({x, y: max - y}))
    console.log(max)
    const createPath = (data:Point[]) => {
        let path = ''
        data.forEach(({x, y}, index) => {
            if(index === 0)
                path = `M ${x},${y} `
            else
                path += `C ${data[index - 1].x + 5.5},${data[index - 1].y} ${x - 5.5},${y} ${x},${y} `
        })
        return path
    }
    const createColoredArea = (data:Point[]) => {
        let path = `M ${data[0].x},0 `
        data.forEach(({x, y}, index) => {
            if(index === 0)
                path += `L ${x},${y} `
            else
                path += `C ${data[index - 1].x + 5.5},${data[index - 1].y} ${x - 5.5},${y} ${x},${y} `
        })
        console.log(path)
        path += `L ${data[data.length - 1].x},0`
        return path
    }
    const createYLegend = (max: number) => {
        const labels = Array.from({length: max}, (_, i) => i * 10);
        return labels.map((value, index) => <G key={index} x={-innerOffset.x / 2} y={value}><SvgText transform={'scale(1, -1)'} textAnchor='middle' alignmentBaseline='bottom' key={index} fontSize={2.5} fill="white">{value}</SvgText></G>)
    }
    const createXLegend = (labels: string[]) => {
        return labels.map((value, index) => <G key={index} x={index * 10} rotation={-35} y={-3.5}><SvgText vectorEffect='non-scaling-stroke' transform={`scale(1, -1)`} key={index} fontSize={2.5} fill="white">{value}</SvgText></G>)
    }
    const onDrag = useAnimatedGestureHandler<any, {translateX: number}>({
        onStart: (event, context) => {
            context.translateX = translateX.value;
        },
        onActive: (event, context) => {
            console.log(translateX.value, context.translateX)
            translateX.value = context.translateX + event.translationX * 0.2;
        },
    });


    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                }
            ],
        };
    });

    console.log(max + innerOffset.y )
    return (
        <View className='dark:bg-dark-main flex-1 pt-2'>
            <View className='flex flex-row px-5 gap-5 mb-4'>
                {Object.values(PowerPlantsTabs).map((tab, index) => <Text key={index}
                                                                        className={`text-white opacity-40 ${tab === activeTab && 'text-tint opacity-100'}`}
                                                                        onPress={() => setActiveTab(tab)}>{tab}</Text>)}
            </View>
            {/*<View className='rounded-lg bg-red-500 flex items-center bg-dark-element mx-auto' style={{width: graphWidth}}>*/}
            {/*    <Svg scaleY={-1} viewBox={`${-innerOffset.x} ${-innerOffset.y} 75 ${max + innerOffset.y + padding}`} style={{width: graphWidth, height: 300, backgroundColor: '#292A3E'}}>*/}
            {/*        <Rect y={-innerOffset.y} width={graphWidth} height={innerOffset.y} fill='#292A3E'></Rect>*/}
            {/*        <AnimatedGroup style={[containerStyle]}>*/}
            {/*            {createXLegend(data.map(({xLabel}) => xLabel))}*/}
            {/*        </AnimatedGroup>*/}

            {/*        <PanGestureHandler onGestureEvent={onDrag}><AnimatedGroup translateY={0} style={[containerStyle]}>*/}
            {/*            <Path strokeWidth={0.5} d={createPath(transformedData)} stroke="rgba(245, 133, 43, 1)" fill="none"/>*/}
            {/*            <Path d={createColoredArea(transformedData)} stroke="none" fill="rgba(245, 133, 43, 0.3)"/>*/}
            {/*        </AnimatedGroup></PanGestureHandler>*/}

            {/*        <Rect width={innerOffset.x} x={-innerOffset.x} height={max + innerOffset.y + padding} y={-innerOffset.y} fill='#292A3E'/>*/}
            {/*        {createYLegend(max)}*/}


            {/*        <G x={-innerOffset.x} y={-innerOffset.y - 1}>*/}
            {/*            <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' fill='#1C1B2D'></Path>*/}
            {/*        </G>*/}
            {/*        <G x={75 - innerOffset.x} y={-innerOffset.y - 1}>*/}
            {/*            <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' rotation={90} fill='#1C1B2D'></Path>*/}
            {/*        </G>*/}
            {/*        <G x={-innerOffset.x} y={max + padding + 1}>*/}
            {/*            <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' rotation={-90} fill='#1C1B2D'></Path>*/}
            {/*        </G>*/}
            {/*        <G x={75 - innerOffset.x} y={max + padding + 1}>*/}
            {/*            <Path d='M 0,0 L 3,0 A 3,3 0 0,0 0,3 L 0,0' rotation={180} fill='#1C1B2D'></Path>*/}
            {/*        </G>*/}

            {/*    </Svg>*/}
            {/*</View>*/}
            {/*<LineChartNoLibrary/>*/}
            <ChartWithZoom/>
        </View>
    )
}
export default DashboardScreen;