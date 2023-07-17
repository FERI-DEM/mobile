import usePowerPlantPowerHistory from '../hooks/usePowerPlantPowerHistory';
import React, { useMemo} from 'react';
import usePrediction from '../hooks/usePrediction';
import { usePowerPlantStore } from '../store/power-plant-store';
import DataView from './DataView';
import { graphHeight } from '../constants/line-chart';
import LineChartSkeleton from "./LineChartSkeleton";
import LineChart from "./LineChart";

const PowerPlantProductionLineChart = () => {
  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );
  const { data: predictions, isFetching: isFetchingPredictions } = usePrediction(selectedPowerPlant?.id || '', {
    enabled: !!selectedPowerPlant,
    retry: false,
  });
  const { data: history, fetchNextPage, isFetching: isFetchingHistory, isFetchingNextPage } = usePowerPlantPowerHistory(
    selectedPowerPlant?.id || '',
    {
      retry: false,
      enabled: !!selectedPowerPlant,
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
      loadingComponent={<LineChartSkeleton height={graphHeight}/>}
    >
      {(data) => (
            <LineChart
                key={selectedPowerPlant?.id}
                predictions={data.predictions}
                history={data.history}
                onStopScrolling={onStopScrolling}
            />
      )}
    </DataView>
  );
};
export default PowerPlantProductionLineChart;
