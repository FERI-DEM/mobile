import {useCommunityStore} from "../store/community-store";
import useCommunityMonthlyPowerProduction from "../hooks/useCommunityMonthlyPowerProduction";
import Svg from "react-native-svg";
import {useMemo} from "react";
import {getColor} from "../utils/random-color";
import Bar from "./Bar";
import ViewportAwareView, {ViewportAwareViewMode} from "./ViewportAwareView";
import {barChartGap, barChartHeight, barChartHorizontalMargin, viewBoxSize} from "../constants/bar-chart";
import {useWindowDimensions} from "react-native";


const CommunityBarChart = () => {
    const selectedCommunity = useCommunityStore(state => state.selectedCommunity);
    const window = useWindowDimensions();
    const graphWidth = window.width - barChartHorizontalMargin * 2;

    const { data: monthlyPowerProduction, isLoading } = useCommunityMonthlyPowerProduction(
        selectedCommunity?.id || '',
        { enabled: !!selectedCommunity }
    );

    const barChartData = useMemo(() => {
        if(!monthlyPowerProduction || monthlyPowerProduction.powerPlants.length === 0) return [];

        let max = Math.max(...monthlyPowerProduction.powerPlants.map(item => item.production)) * 1.1;
        const barWidth = (viewBoxSize.width - (monthlyPowerProduction.powerPlants.length - 1) * barChartGap) / monthlyPowerProduction.powerPlants.length

        return monthlyPowerProduction.powerPlants.map((powerPlant, index) => {
            const height = powerPlant.production * (viewBoxSize.height / max);
            let x = index * barWidth + (index) * barChartGap
            if(index === 0) x = 0
            return {
                x: x,
                y: viewBoxSize.height - height,
                width: barWidth,
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
            preserveAspectRatio="none"
            viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
            style={{ height: barChartHeight, backgroundColor: '#1C1B2D', width: graphWidth }}
        >
            {barChartData.map((data, index) => (
                <Bar data={data} key={index} graphWidth={graphWidth}/>
            ))}
        </Svg>
    </ViewportAwareView>
}
export default CommunityBarChart;