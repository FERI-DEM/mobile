import {useWindowDimensions, View} from "react-native";
import React, {useEffect} from "react";
import Svg, {G, Path, Rect} from "react-native-svg";
import Animated, {
    cancelAnimation,
    runOnJS,
    runOnUI,
    useAnimatedProps,
    useAnimatedReaction,
    useDerivedValue,
    useSharedValue,
    withDecay
} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {PredictedValue} from "../types/powerPlant.types";
import {createPathForRoundedCorners, prepareActiveData, prepareData} from "../utils/line-chart";
import {chars} from "../utils/chart-text";
import {charWidth, fontSize, innerOffset, padding, viewBoxSize, xUnit} from "../constants/line-chart";
import {ChartOffset} from "../types/chart.types";
import usePowerPlantPowerHistory from "../hooks/usePowerPlantPowerHistory";
import {usePowerPlantStore} from "../store/power-plant-store";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedGroup = Animated.createAnimatedComponent(G);

interface LineChartProps {
    data: PredictedValue[]
}

const LineChart = ({data: dataFromProps}: LineChartProps) => {
    const selectedPowerPlant = usePowerPlantStore(state => state.selectedPowerPlant)

    const {data: history} = usePowerPlantPowerHistory({id: selectedPowerPlant?.id || '', from: new Date(Date.UTC(2023, 5, 7)), to: new Date(Date.UTC(2023, 5, 8))})
    if(history)
    console.log(history[0])
    const window = useWindowDimensions()
    const graphWidth = window.width - 30

    const max = Math.max(...dataFromProps.map(({power}) => power))

    useEffect(() => {
        data.value = prepareData(dataFromProps)
    }, [dataFromProps])

    const activeScale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const zoomPoint = useSharedValue(30);

    const translateLimits = useSharedValue({min: 0, max: 100})
    const activeTranslate = useSharedValue(0)
    const savedTranslate = useSharedValue(0)

    const allData = useSharedValue(prepareData(dataFromProps))
    const data = useSharedValue(prepareActiveData(allData.value, activeTranslate.value))

    const xLegend = useSharedValue('')

    useAnimatedReaction(() => savedTranslate.value, (result) => {
        data.value = prepareActiveData(allData.value, result)
    }, [])


    const generateCharPath = (char: string, offset: ChartOffset) => {
        const points = chars.get(char)
        if (!points) return ''
        let path = ''

        for (let i = 0; i < points.length; i += 4) {
            const x1 = points[i] + (offset.x || 0)
            const y1 = points[i + 1] + (offset.y || 0)
            const x2 = points[i + 2] + (offset.x || 0)
            const y2 = points[i + 3] + (offset.y || 0)
            path += `M ${x1} ${y1} L ${x2} ${y2} `
        }
        return path
    }
    const generateTextPath = (text: string, offset: ChartOffset) => {
        const chars = text.split('')
        return chars.map((char, index) => generateCharPath(char, {
            x: (-text.length / 2 + index) * charWidth + (offset.x || 0),
            y: offset.y
        })).join(' ')
    }

    const createYLegend = (max: number) => {
        const numberOfLabels = 6
        const ratio = max / (viewBoxSize.height - innerOffset.y - padding)
        const unit = (viewBoxSize.height - innerOffset.y - padding) / numberOfLabels

        const labels = Array.from({length: numberOfLabels + 1}, (_, i) => Math.round(i * unit * ratio).toString());
        let path = ''
        labels.forEach((label, index) => {
            path += generateTextPath(label + 'kW', {y: index * unit}) + ' '
        })
        return path
    }

    const createXLegend = (data: { date: string, x: number, y: number }[]) => {
        let path = ''
        data.forEach(({x, date: dateAndTime}) => {
            const [date, time] = dateAndTime.split('T')
            path += generateTextPath(time, {x, y: -innerOffset.y / 2.5}) + ' '

            if (x % (4 * xUnit) === 0)
                path += generateTextPath(date, {x, y: -innerOffset.y / 1.2}) + ' '
        })
        runOnUI(() => {
            xLegend.value = path
        })()
    }
    useAnimatedReaction(() => data.value, (result) => {
        runOnJS(createXLegend)(result)
    }, [])

    const line = useDerivedValue(() => {
        let path = ''
        const unitLength = data.value[1].x - data.value[0].x
        data.value.forEach(({x, y}, index) => {
            x = zoomPoint.value + (x - zoomPoint.value) * activeScale.value
            if (index === 0)
                path = `M ${x},${y} `
            else
                path += `C ${zoomPoint.value + (data.value[index - 1].x - zoomPoint.value) * activeScale.value + 0.5 * unitLength * activeScale.value},${data.value[index - 1].y} ${x - 0.5 * unitLength * activeScale.value},${y} ${x},${y} `
        })
        return path
    }, [])

    const area = useDerivedValue(() => {
        const unitLength = data.value[1].x - data.value[0].x
        let path = `M ${zoomPoint.value + (data.value[0].x - zoomPoint.value) * activeScale.value},0 `
        data.value.forEach(({x, y}, index) => {
            x = zoomPoint.value + (x - zoomPoint.value) * activeScale.value
            if (index === 0)
                path += `L ${x},${y} `
            else
                path += `C ${zoomPoint.value + (data.value[index - 1].x - zoomPoint.value) * activeScale.value + 0.5 * unitLength * activeScale.value},${data.value[index - 1].y} ${x - 0.5 * unitLength * activeScale.value},${y} ${x},${y} `
        })
        path += `L ${zoomPoint.value + (data.value[data.value.length - 1].x - zoomPoint.value) * activeScale.value},0`
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
            data.value = data.value.map(({
                                             x,
                                             y,
                                             date
                                         }) => ({
                x: zoomPoint.value + (x - zoomPoint.value) * activeScale.value,
                y,
                date
            }))
            activeScale.value = 1
        });

    const panGesture = Gesture.Pan()
        .maxPointers(1)
        .onStart(() => {
            savedTranslate.value = activeTranslate.value
            cancelAnimation(activeTranslate)
        })
        .onUpdate((e) => {
            const newTranslate = savedTranslate.value + e.translationX * 0.2
            // //TODO: max limit
            // if(newTranslate + translateLimits.value.min < 0)
            activeTranslate.value = newTranslate
        })
        .onEnd((e) => {
            activeTranslate.value = withDecay({velocity: e.velocityX / 10}, (data) => {
                savedTranslate.value = activeTranslate.value
            })
        })

    const animatedProps = useAnimatedProps(() => ({d: line.value}))
    const areaAnimatedProps = useAnimatedProps(() => ({d: area.value}))
    const animatedTranslateProps = useAnimatedProps(() => ({x: activeTranslate.value}))
    const animatedXLegendProps = useAnimatedProps(() => ({d: xLegend.value}))

    return (<>
            <View className='rounded-lg bg-red-500 flex items-center bg-dark-element mx-auto'
                  style={{width: graphWidth}}>
                <GestureDetector gesture={panGesture}>
                    <GestureDetector gesture={pinchGesture}>
                        <Svg preserveAspectRatio='none' scaleY={-1}
                             viewBox={`${-innerOffset.x} ${-innerOffset.y} ${viewBoxSize.width} ${viewBoxSize.height}`}
                             style={{width: graphWidth, height: 300, backgroundColor: '#292A3E'}}>

                            <Rect y={-innerOffset.y} width={graphWidth} height={innerOffset.y} fill='#292A3E'/>
                            <AnimatedGroup animatedProps={animatedTranslateProps}>

                                <AnimatedPath strokeWidth={0.5} animatedProps={animatedProps}
                                              stroke="rgba(245, 133, 43, 1)" fill="none"/>
                                <AnimatedPath animatedProps={areaAnimatedProps} stroke="none"
                                              fill="rgba(245, 133, 43, 0.3)"/>
                                <AnimatedPath animatedProps={animatedXLegendProps} strokeWidth='0.2' stroke='white'/>
                                {/*<Path stroke='white' strokeWidth={0.1} d='M 0,0 L 0,3 M 0,6 L 0,9 M 0,12 L 0,15 M 0,18 L 0,21'/>*/}

                            </AnimatedGroup>

                            <Rect width={innerOffset.x} x={-innerOffset.x} height={max + innerOffset.y + padding}
                                  y={-innerOffset.y} fill='#292A3E'/>
                            <Path x={-innerOffset.x / 2} y={-fontSize / 2}
                                  d={createYLegend(max)} strokeWidth='0.2' stroke='white'/>
                            <Path fill='#1C1B2D' d={createPathForRoundedCorners({
                                x: -innerOffset.x,
                                y: -innerOffset.y
                            }, {x: viewBoxSize.width - innerOffset.x, y: viewBoxSize.height - innerOffset.y}, 2)}/>

                        </Svg>
                    </GestureDetector>
                </GestureDetector>
            </View>
        </>

    )
}
export default LineChart;