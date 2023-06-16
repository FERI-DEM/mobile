import Animated, {useAnimatedProps, useSharedValue, withTiming} from "react-native-reanimated";
import {G, Rect} from "react-native-svg";
import {useContext, useEffect} from "react";
import {ViewportContext} from "./ViewportAwareView";
import {Text as SvgText} from "react-native-svg";
import {convertFromBaseUnit} from "../utils/units";

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
   }
}
const AnimatedGroup = Animated.createAnimatedComponent(G);
const Bar = ({data}: BarProps) => {
    const barSize = useSharedValue(100)
    const {isInViewport} = useContext(ViewportContext)

    useEffect(() => {
        if(isInViewport) {
            barSize.value = withTiming(data.y, {duration: 600})
        }
    }, [isInViewport])

    const animatedProps = useAnimatedProps(() => ({ y: barSize.value }));

    return <AnimatedGroup animatedProps={animatedProps}>
            <Rect y={0} x={data.x} width={data.width} height={data.height} fill={data.color}/>
            <SvgText y={-1} x={data.text.x - 1} fontSize={4} fill="#fff" textAnchor="middle">{convertFromBaseUnit(data.text.value, 'W')}</SvgText>
        </AnimatedGroup>
}
export default Bar;