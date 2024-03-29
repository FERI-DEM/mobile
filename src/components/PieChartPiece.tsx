import {getPieChartPiecePath} from "../utils/pie-chart";
import {getColor} from "../utils/random-color";
import {Path} from "react-native-svg";
import React, {useContext, useEffect} from "react";
import Animated, {
    runOnJS, runOnUI,
    useAnimatedProps,
    useAnimatedReaction,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {ViewportContext} from "./ViewportAwareView";
import {colors} from "../constants/colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);
interface PieChartPieceProps {
    data: {
        from: number;
        to: number;
    },
    index: number;
}
const PieChartPiece = ({data, index}: PieChartPieceProps) => {
    const loadedAngle = useSharedValue(data.from)
    const piecePath = useSharedValue('')

    const {isInViewport} = useContext(ViewportContext)

    useEffect(() => {
        if(isInViewport)
            loadedAngle.value = withTiming(data.to, {duration: 600})

    }, [isInViewport])

    const createPath = (angle: number) => {
        const path = getPieChartPiecePath(100, data.from, angle);
        runOnUI(() => {
            piecePath.value = path;
        })()
    }

    useAnimatedReaction(
        () => loadedAngle.value,
        (result) => {
            runOnJS(createPath)(result);
        },
        []
    );

    const animatedProps = useAnimatedProps(() => ({ d: piecePath.value }));

    return <AnimatedPath
        animatedProps={animatedProps}
        fill={getColor(index)}
        stroke={colors.dark.primary}
        strokeWidth={2}
    />
}
export default PieChartPiece;