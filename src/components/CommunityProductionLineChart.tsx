import LineChart from './LineChart';
import React, { useMemo } from 'react';
import DataView from './DataView';
import {useCommunityStore} from "../store/community-store";
import useCommunityPowerProduction from "../hooks/useCommunityPowerProduction";
import useCommunityPowerHistory from "../hooks/useCommunityPowerHistory";
import LineChartSkeleton from "./LineChartSkeleton";

const CommunityProductionLineChart = () => {
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
            loadingComponent={<LineChartSkeleton height={300}/>}
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
