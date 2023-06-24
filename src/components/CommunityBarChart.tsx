import {useCommunityStore} from "../store/community-store";
import useCommunityMonthlyPowerProduction from "../hooks/useCommunityMonthlyPowerProduction";
import Svg from "react-native-svg";
import React, {useMemo} from "react";
import {getColor} from "../utils/random-color";
import Bar from "./Bar";
import ViewportAwareView from "./ViewportAwareView";
import {barChartGap, barChartHeight, barChartHorizontalMargin, viewBoxSize} from "../constants/bar-chart";
import {useWindowDimensions, View} from "react-native";
import DataView from "./DataView";
import Skeleton from "./Skeleton";
import {colors} from "../constants/colors";
import {useColorScheme} from "nativewind";


const CommunityBarChart = () => {
    const {colorScheme} = useColorScheme()
    const selectedCommunity = useCommunityStore(state => state.selectedCommunity);
    const window = useWindowDimensions();
    const graphWidth = window.width - barChartHorizontalMargin * 2;

    const { data: monthlyPowerProduction, isFetching } = useCommunityMonthlyPowerProduction(
        selectedCommunity?.id || '',
        { enabled: !!selectedCommunity }
    );

    const barChartData = useMemo(() => {
        if(!monthlyPowerProduction || monthlyPowerProduction.powerPlants.length === 0) return undefined;

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

    return <DataView
        isLoading={isFetching}
        data={barChartData}
        loadingComponent={<Skeleton classNameContainer='shadow-lg shadow-black bg-light-main dark:bg-dark-main flex flex-row items-end' style={{height: barChartHeight}}>
            <View className='bg-dark-element grow' style={{height: barChartHeight * 0.6}}></View>
            <View className='bg-dark-element mx-2 grow' style={{height: barChartHeight * 0.9}}></View>
            <View className='bg-dark-element mr-2 grow' style={{height: barChartHeight * 0.3}}></View>
            <View className='bg-dark-element grow' style={{height: barChartHeight * 0.3}}></View>
        </Skeleton>}
    >
        {barChartData => (
            <ViewportAwareView>
                <Svg
                    preserveAspectRatio="none"
                    viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
                    style={{ height: barChartHeight, backgroundColor: colors[colorScheme].primary, width: graphWidth }}
                >
                    {barChartData.map((data, index) => (
                        <Bar data={data} key={index} graphWidth={graphWidth}/>
                    ))}
                </Svg>
            </ViewportAwareView>
        )}
    </DataView>
}
export default CommunityBarChart;