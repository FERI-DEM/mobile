import LineChart from './LineChart';
import usePowerPlantPowerHistory from '../hooks/usePowerPlantPowerHistory';
import React, { useMemo } from 'react';
import usePrediction from '../hooks/usePrediction';
import { usePowerPlantStore } from '../store/power-plant-store';
import DataView from './DataView';
import { graphHeight, graphHorizontalMargin } from '../constants/line-chart';
import { useDashboardTabsStore } from '../store/dashboard-tabs-store';
import {useCommunityStore} from "../store/community-store";
import useCommunityPowerProduction from "../hooks/useCommunityPowerProduction";
import useCommunityPowerHistory from "../hooks/useCommunityPowerHistory";
import Skeleton from "./Skeleton";
import {colors} from "../constants/colors";
import Svg, {Path, Rect} from "react-native-svg";
import {useColorScheme} from "nativewind";
const CommunityProductionLineChart = () => {
    const {colorScheme} = useColorScheme()
    const selectedCommunity = useCommunityStore(
        (state) => state.selectedCommunity
    );
    const { data: predictions, isFetching: isFetchingPredictions } = useCommunityPowerProduction(selectedCommunity?.id || '', {
        enabled: !!selectedCommunity,
        retry: false,
    });
    const { data: history, fetchNextPage, isFetching: isFetchingHistory, isFetchingNextPage } = useCommunityPowerHistory(
        selectedCommunity?.id || '',
        {
            retry: false,
            enabled: !!selectedCommunity,
        }
    );

    const onStopScrolling = (scrollX: number) => {
        if (scrollX < 0) fetchNextPage();
    };

    const data = useMemo(() => {
        if (!predictions || !history) return undefined;

        const reversedHistory = [...history.pages].reverse();
        const preparedHistory = reversedHistory.flat().map((item) => ({
            date: new Date(
                item.timestamp - new Date().getTimezoneOffset() * 60000
            ).toISOString(),
            power: item.predictedPower,
        }));

        return { predictions, history: preparedHistory.reverse() };
    }, [predictions, history]);

    return (
        <DataView
            data={data}
            isLoading={(isFetchingPredictions || isFetchingHistory) && !isFetchingNextPage}
            loadingComponent={<Skeleton classNameContainer='flex-1' style={{
                height: graphHeight,
            }}>
                <Svg preserveAspectRatio='none' viewBox='0 0 200 200' style={{ height: 300, backgroundColor: colors[colorScheme].element }}>
                    {[...Array(8).keys()].map((v, i) => (
                        <Rect key={i} fill={colors[colorScheme].skeletonContent} width={16} height={7} x={25 + i * 21} y={172}/>
                    ))}
                    {[...Array(3).keys()].map((v, i) => (
                        <Rect key={i} fill={colors[colorScheme].skeletonContent} width={33} height={7} x={28 + i * 65} y={187}/>
                    ))}
                    {[...Array(7).keys()].map((v, i) => (
                        <Rect key={i} fill={colors[colorScheme].skeletonContent} width={16} height={7} x={5} y={10 + i * 25}/>
                    ))}
                    <Path d='M 25,165 C 38,165 33,100 46,100 C 59,100 54,70 67,70 C 80,70 75,140, 88,140 C 101,140 96,30 109,30 C 122,30, 117,155 130,155 C 143,155 138,130 151,130 C 164,130 159,90 172,90 C 185,90 180,120 193,120 L 193,165 L 25,165' strokeWidth={0} stroke='rgba(61,62,95,0.6)' fill='rgba(61,62,95,0.6)'/>
                    <Path d='M 25,165 C 38,165 33,100 46,100 C 59,100 54,70 67,70 C 80,70 75,140, 88,140 C 101,140 96,30 109,30 C 122,30, 117,155 130,155 C 143,155 138,130 151,130 C 164,130 159,90 172,90 C 185,90 180,120 193,120' strokeWidth={2} stroke={colors[colorScheme].skeletonContent}/>

                </Svg>
            </Skeleton>}
        >
            {(data) => (
                <LineChart
                    key={selectedCommunity?.id}
                    predictions={data.predictions}
                    history={data.history}
                    onStopScrolling={onStopScrolling}
                />
            )}
        </DataView>
    );
};
export default CommunityProductionLineChart;
