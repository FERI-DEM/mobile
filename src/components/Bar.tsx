import Animated, {useAnimatedProps, useSharedValue, withTiming} from "react-native-reanimated";
import {G, Rect} from "react-native-svg";
import {useContext, useEffect} from "react";
import {ViewportContext} from "./ViewportAwareView";
import {Text as SvgText} from "react-native-svg";
import {convertFromBaseUnit} from "../utils/units";
import {barChartHeight, viewBoxSize} from "../constants/bar-chart";
import {colors} from "../constants/colors";
import {useColorScheme} from "nativewind";

interface BarProps {
   data: {
       x: number;
       y: number;
       width: number;
       height: number;
       color: string;
       text: {
           value: number;
           x: number;
       }
   },
    graphWidth: number;
}
const AnimatedGroup = Animated.createAnimatedComponent(G);
const Bar = ({data, graphWidth}: BarProps) => {
    const {colorScheme} = useColorScheme()
    const barSize = useSharedValue(viewBoxSize.height)
    const {isInViewport} = useContext(ViewportContext)

    useEffect(() => {
        if(isInViewport) {
            barSize.value = withTiming(data.y, {duration: 600})
        }
    }, [isInViewport])

    const animatedProps = useAnimatedProps(() => ({ y: barSize.value }));

    return <AnimatedGroup animatedProps={animatedProps}>
            <Rect y={0} x={data.x} width={data.width} height={data.height} fill={data.color}/>
            <SvgText transform={{scale: [1, graphWidth / barChartHeight]}} y={-4} x={data.text.x - 1} fontSize={12} fill={colors[colorScheme].text} textAnchor="middle">{convertFromBaseUnit(data.text.value, 'W')}</SvgText>
        </AnimatedGroup>
}
export default Bar;