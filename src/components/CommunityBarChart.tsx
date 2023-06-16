import {useCommunityStore} from "../store/community-store";
import useCommunityMonthlyPowerProduction from "../hooks/useCommunityMonthlyPowerProduction";
import Svg, {Path, Rect, Text as SvgText} from "react-native-svg";
import {innerOffset, padding} from "../constants/line-chart";
import {Fragment, useEffect, useMemo, useRef} from "react";
import Animated, {useAnimatedProps, useSharedValue, withTiming} from "react-native-reanimated";
import {getColor} from "../utils/random-color";
import {convertFromBaseUnit} from "../utils/units";
import Bar from "./Bar";
import ViewportAwareView from "./ViewportAwareView";

const viewBoxSize = {
    width: 100,
    height: 100,
};
const gap = 2

const CommunityBarChart = () => {
    const barChartHeight = 300;
    const selectedCommunity = useCommunityStore(state => state.selectedCommunity);

    const { data: monthlyPowerProduction, isLoading } = useCommunityMonthlyPowerProduction(
        selectedCommunity?.id || '',
        { enabled: !!selectedCommunity }
    );

    const barChartData = useMemo(() => {
        if(!monthlyPowerProduction || monthlyPowerProduction.powerPlants.length === 0) return [];

        const max = Math.max(...monthlyPowerProduction.powerPlants.map(item => item.production)) * 1.1;
        const barWidth = viewBoxSize.width / monthlyPowerProduction.powerPlants.length - gap;

        return monthlyPowerProduction.powerPlants.map((powerPlant, index) => {
            const height = powerPlant.production * (viewBoxSize.height / max);
            const x = index * barWidth + (index + 1) * gap
            return {
                x: x,
                y: viewBoxSize.height - height,
                width: barWidth - gap,
                height: powerPlant.production * (viewBoxSize.height / max),
                color: getColor(index),
                text: {
                    value: parseFloat(powerPlant.production.toFixed(2)) * 1000,
                    x: x + barWidth / 2,
                }
            }
        })
    }, [monthlyPowerProduction]);

    return <ViewportAwareView>
        <Svg
            viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
            className="w-full"
            style={{ height: barChartHeight, backgroundColor: '#1C1B2D' }}
        >
            {barChartData.map((data, index) => (
                <Bar data={data} key={index}/>
            ))}
        </Svg>
    </ViewportAwareView>
}
export default CommunityBarChart;